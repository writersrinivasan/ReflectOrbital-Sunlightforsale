import Anthropic from "@anthropic-ai/sdk";
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";
import { mirrorsNeeded, simulateReflection } from "@/lib/physics";
import { alternatives, resources, searchKnowledge, LAST_CHECKED } from "@/lib/knowledge";

export const maxDuration = 60;

type ChatTurn = { role: "user" | "assistant"; content: string };
type ToolTrace = { tool: string; input: unknown; summary: string };

const SYSTEM = `You are "Orbi", a cheerful, crystal-clear guide inside an educational web app about Reflect Orbital — the startup that wants to sell sunlight from orbit using satellite mirrors.

How you work:
- You are an agent with tools. Use them: run simulate_reflection or mirrors_needed for any numbers about brightness, spot size or power; use search_knowledge for company facts, timeline, workflow and the debate; use compare_alternatives and find_learning_resources when the user asks about other approaches or wants to study further.
- Only state company-specific facts (funding, dates, satellite specs, plans) that come from search_knowledge, and say they are "reported" where relevant. Knowledge last checked: ${LAST_CHECKED}. If something isn't in your tools, say you're not sure.
- Be balanced: explain the vision AND the criticism (faint light per mirror, astronomy, ecology, aviation, clouds, orbital crowding).
- Write for a curious teenager: short paragraphs, a few emojis, simple analogies, and bold the key number. Keep answers under ~220 words unless asked for depth. When you suggest resources, list them as markdown links.`;

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: ChatTurn[] };
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "No messages sent." }, { status: 400 });
  }

  const trace: ToolTrace[] = [];

  const simulateTool = betaZodTool({
    name: "simulate_reflection",
    description:
      "Physics model of sunlight reflected by square orbital mirrors onto one ground spot. Returns spot size, irradiance (W/m²), lux, full-moon equivalents, % of noon sun and output of a 100 MW solar farm in the spot.",
    inputSchema: z.object({
      mirror_side_m: z.number().min(1).max(500).describe("Side length of each square mirror in metres (EARENDIL-1 ≈ 18)"),
      altitude_km: z.number().min(200).max(2000).describe("Orbit altitude in km (EARENDIL-1 ≈ 625)"),
      mirror_count: z.number().int().min(1).max(1_000_000).describe("How many mirrors overlap on the same spot"),
    }),
    run: async (input) => {
      const r = simulateReflection({
        mirrorSideM: input.mirror_side_m,
        altitudeKm: input.altitude_km,
        mirrorCount: input.mirror_count,
      });
      trace.push({ tool: "simulate_reflection", input, summary: `${r.irradianceWm2.toPrecision(3)} W/m² over a ${r.spotDiameterKm.toFixed(1)} km spot` });
      return JSON.stringify(r);
    },
  });

  const mirrorsTool = betaZodTool({
    name: "mirrors_needed",
    description: "How many overlapping mirrors are needed to reach a target ground irradiance in W/m² (noon sun ≈ 1000, a useful solar boost ≈ 200).",
    inputSchema: z.object({
      target_w_m2: z.number().min(0.001).max(1500),
      mirror_side_m: z.number().min(1).max(500),
      altitude_km: z.number().min(200).max(2000),
    }),
    run: async (input) => {
      const n = mirrorsNeeded(input.target_w_m2, input.mirror_side_m, input.altitude_km);
      trace.push({ tool: "mirrors_needed", input, summary: `${n.toLocaleString()} mirrors` });
      return JSON.stringify({ mirrors_needed: n, ...input });
    },
  });

  const knowledgeTool = betaZodTool({
    name: "search_knowledge",
    description: "Search the app's curated knowledge base about Reflect Orbital: company facts, what/why/how, the light-delivery workflow, timeline, pros and cons.",
    inputSchema: z.object({ topic: z.string().describe("Keywords, e.g. 'funding FCC launch' or 'astronomy ecology'") }),
    run: async (input) => {
      const result = searchKnowledge(input.topic);
      const hits = Object.values(result).reduce((n, v) => n + (Array.isArray(v) ? v.length : 0), 0);
      trace.push({ tool: "search_knowledge", input, summary: `${hits} matching entries` });
      return JSON.stringify(result);
    },
  });

  const alternativesTool = betaZodTool({
    name: "compare_alternatives",
    description: "Return alternative approaches to night-time / evening clean power (space solar, batteries, storage, grids, etc.) and how each compares to Reflect Orbital.",
    inputSchema: z.object({
      category: z.enum(["Space", "Storage", "Grid", "Generation", "All"]).describe("Filter by category"),
    }),
    run: async (input) => {
      const list = input.category === "All" ? alternatives : alternatives.filter((a) => a.category === input.category);
      trace.push({ tool: "compare_alternatives", input, summary: `${list.length} alternatives` });
      return JSON.stringify(list);
    },
  });

  const resourcesTool = betaZodTool({
    name: "find_learning_resources",
    description: "Find curated learning resources (articles, research, courses, books, organisations) with URLs.",
    inputSchema: z.object({
      query: z.string().describe("Keywords, e.g. 'space solar power' or 'dark sky'"),
      level: z.enum(["Beginner", "Intermediate", "Advanced", "Any"]),
    }),
    run: async (input) => {
      const words = input.query.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
      const list = resources
        .filter((r) => input.level === "Any" || r.level === input.level)
        .filter((r) => words.length === 0 || words.some((w) => `${r.title} ${r.topic} ${r.blurb}`.toLowerCase().includes(w)))
        .slice(0, 8);
      trace.push({ tool: "find_learning_resources", input, summary: `${list.length} resources` });
      return JSON.stringify(list);
    },
  });

  const client = new Anthropic();

  try {
    const final = await client.beta.messages.toolRunner({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      max_iterations: 8,
      system: SYSTEM,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      tools: [simulateTool, mirrorsTool, knowledgeTool, alternativesTool, resourcesTool],
      messages: messages.slice(-12).map((m) => ({ role: m.role, content: m.content })),
    });

    if (final.stop_reason === "refusal") {
      return Response.json({ reply: "I can't help with that one — try asking about how the mirrors, the business or the alternatives work! 🌞", trace });
    }

    const reply = final.content
      .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n\n");
    return Response.json({ reply: reply || "Hmm, I came back empty — could you rephrase?", trace });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return Response.json(
        { error: "Orbi needs an Anthropic API key. Add ANTHROPIC_API_KEY to .env.local and restart `npm run dev`." },
        { status: 401 },
      );
    }
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "Orbi is getting lots of questions — please try again in a moment." }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      return Response.json({ error: `The AI service returned an error (${err.status ?? "network"}).` }, { status: 502 });
    }
    const missingKey = err instanceof Error && /api ?key|authentication/i.test(err.message);
    return Response.json(
      { error: missingKey ? "Orbi needs an Anthropic API key. Add ANTHROPIC_API_KEY to .env.local and restart `npm run dev`." : "Something went wrong talking to Orbi." },
      { status: 500 },
    );
  }
}
