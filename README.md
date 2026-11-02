# Sunlight For Sale — Reflect Orbital Explained

A colourful, interactive Next.js explainer of Reflect Orbital's plan to sell sunlight from orbital mirrors, with an agentic AI guide ("Orbi").

## Run it

```bash
cp .env.example .env.local   # then paste your key: ANTHROPIC_API_KEY=sk-ant-...
npm install
npm run dev                  # http://localhost:3000
```

Everything except the Orbi chat works without a key.

## What's inside

| Section | File |
|---|---|
| Hero + key facts | `src/components/Hero.tsx` |
| What · Why · How tabs + analogies | `src/components/WhatWhyHow.tsx` |
| Mirror physics simulator | `src/components/Simulator.tsx`, `src/lib/physics.ts` |
| Animated photon → paycheck workflow | `src/components/Workflow.tsx` |
| 100-year timeline | `src/components/Timeline.tsx` |
| Pros/cons debate + vote | `src/components/Debate.tsx` |
| Alternatives (space solar, storage, grids…) | `src/components/Alternatives.tsx` |
| Learning library (filters + guided paths) | `src/components/Resources.tsx` |
| Quiz | `src/components/Quiz.tsx` |
| Orbi AI agent (UI) | `src/components/AgentChat.tsx` |
| Orbi AI agent (server) | `src/app/api/agent/route.ts` |

All content lives in `src/lib/knowledge.ts` — the UI and the agent's tools read the same data, so update facts there.

## The agent

`/api/agent` uses the Anthropic SDK **tool runner** (`client.beta.messages.toolRunner`) with Claude Opus 5.5. Claude decides which of five tools to call, loops until it can answer, and the UI shows each tool call as a chip:

- `simulate_reflection` – physics model (spot size, W/m², lux, farm output)
- `mirrors_needed` – how many mirrors for a target brightness
- `search_knowledge` – company facts, workflow, timeline, debate
- `compare_alternatives` – competing approaches
- `find_learning_resources` – curated links

Server-side refusal fallback (`fallbacks: "default"`) is enabled so a declined request is retried on Anthropic's recommended fallback model.

## Accuracy note

Company facts are from public reporting up to November 2026 (FCC approval of EARENDIL-1 on 9 July 2026, ~$35M raised, launch not yet confirmed). The physics model is a simplified nadir estimate; at 625 km one 18 m mirror gives ≈1 lux (~4 full moons) over a ~5.8 km spot, consistent with published estimates.
