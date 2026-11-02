"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

type ToolTrace = { tool: string; input: unknown; summary: string };
type Msg = { role: "user" | "assistant"; content: string; trace?: ToolTrace[]; error?: boolean };

const suggestions = [
  "Explain Reflect Orbital like I'm 12 🧒",
  "How many 18 m mirrors to light a solar farm to 200 W/m²?",
  "Why not just use batteries instead?",
  "What do astronomers worry about?",
  "Give me beginner resources on space solar power",
  "Walk me through one full light delivery, step by step",
];

const toolEmoji: Record<string, string> = {
  simulate_reflection: "🧮",
  mirrors_needed: "🪞",
  search_knowledge: "📚",
  compare_alternatives: "⚖️",
  find_learning_resources: "🎓",
};

export default function AgentChat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi, I'm **Orbi** 🛰️ — an AI agent with a physics simulator, a knowledge base and a library of resources. Ask me anything about selling sunlight from space!" },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, busy]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const history = next.filter((m, i) => i > 0 && !m.error).map(({ role, content }) => ({ role, content }));
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      setMessages((m) => [...m, data.error ? { role: "assistant", content: `⚠️ ${data.error}`, error: true } : { role: "assistant", content: data.reply, trace: data.trace }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "⚠️ Couldn't reach Orbi. Is the dev server running?", error: true }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="glass flex h-[620px] flex-col rounded-3xl">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className={`max-w-[88%] rounded-3xl px-4 py-3 ${m.role === "user" ? "bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950" : m.error ? "bg-red-500/15 ring-1 ring-red-400/40" : "bg-slate-950/60 ring-1 ring-white/10"}`}>
                {m.trace && m.trace.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {m.trace.map((t, ti) => (
                      <span key={ti} title={JSON.stringify(t.input)} className="rounded-full bg-cyan-400/15 px-2 py-0.5 text-[11px] font-semibold text-cyan-200 ring-1 ring-cyan-300/30">
                        {toolEmoji[t.tool] ?? "🔧"} {t.tool} → {t.summary}
                      </span>
                    ))}
                  </div>
                )}
                <div className="space-y-2 text-[15px] leading-relaxed">{renderMarkdown(m.content)}</div>
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex items-center gap-2 text-sm text-cyan-200">
              <span className="animate-orbit inline-block">🛰️</span> Orbi is thinking and calling tools…
            </div>
          )}
          <div ref={endRef} />
        </div>
        <form onSubmit={(e) => (e.preventDefault(), send(input))} className="flex gap-2 border-t border-white/10 p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Orbi about mirrors, money, physics, alternatives…"
            className="flex-1 rounded-full bg-slate-950/60 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-amber-300"
          />
          <button disabled={busy} className="rounded-full bg-gradient-to-r from-amber-400 to-pink-500 px-5 font-bold text-slate-950 disabled:opacity-50">Send</button>
        </form>
      </div>

      <aside className="space-y-4">
        <div className="glass rounded-3xl p-5">
          <div className="font-bold text-amber-200">Try asking</div>
          <div className="mt-3 flex flex-col gap-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} disabled={busy} className="rounded-2xl bg-white/5 px-3 py-2 text-left text-sm hover:bg-white/15 disabled:opacity-50">
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="glass rounded-3xl p-5 text-sm">
          <div className="font-bold text-cyan-200">🤖 How the agent works</div>
          <ol className="mt-2 space-y-1.5 text-slate-300">
            <li><b className="text-white">1. Think</b> — Claude reads your question.</li>
            <li><b className="text-white">2. Act</b> — it picks tools: simulator, knowledge search, alternatives, resources.</li>
            <li><b className="text-white">3. Observe</b> — tool results come back (the blue chips).</li>
            <li><b className="text-white">4. Repeat</b> — until it has enough to answer.</li>
          </ol>
          <p className="mt-2 text-xs text-slate-400">Built with the Anthropic SDK tool runner (Claude Opus 5.5).</p>
        </div>
      </aside>
    </div>
  );
}

// Tiny, safe markdown: paragraphs, bullet lists, **bold**, [links](https://…)
function renderMarkdown(text: string): ReactNode {
  const blocks = text.split(/\n{2,}/);
  return blocks.map((block, bi) => {
    const lines = block.split("\n");
    if (lines.every((l) => /^\s*([-*•]|\d+\.)\s+/.test(l))) {
      return (
        <ul key={bi} className="list-disc space-y-1 pl-5">
          {lines.map((l, li) => <li key={li}>{inline(l.replace(/^\s*([-*•]|\d+\.)\s+/, ""))}</li>)}
        </ul>
      );
    }
    return (
      <p key={bi}>
        {lines.map((l, li) => (
          <Fragment key={li}>{li > 0 && <br />}{inline(l.replace(/^#+\s*/, ""))}</Fragment>
        ))}
      </p>
    );
  });
}

function inline(s: string): ReactNode[] {
  const parts = s.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g);
  return parts.map((p, i) => {
    const bold = p.match(/^\*\*([^*]+)\*\*$/);
    if (bold) return <b key={i} className="text-amber-200">{bold[1]}</b>;
    const link = p.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{link[1]}</a>;
    return <Fragment key={i}>{p}</Fragment>;
  });
}
