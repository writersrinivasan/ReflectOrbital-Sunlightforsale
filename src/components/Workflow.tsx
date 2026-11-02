"use client";

import { useEffect, useState } from "react";
import { workflow } from "@/lib/knowledge";

const phases = [
  { name: "Order", ids: ["order", "plan"], color: "from-pink-500 to-violet-500" },
  { name: "Space", ids: ["sun", "catch", "aim", "beam"], color: "from-amber-400 to-cyan-400" },
  { name: "Earth", ids: ["land", "convert"], color: "from-orange-400 to-yellow-300" },
  { name: "Money", ids: ["sell", "handoff"], color: "from-emerald-400 to-purple-500" },
];

export default function Workflow() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const step = workflow[i];

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setI((n) => (n + 1) % workflow.length), 3200);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {phases.map((p) => (
          <span key={p.name} className={`rounded-full bg-gradient-to-r ${p.color} px-3 py-1 text-xs font-bold text-slate-950 ${p.ids.includes(step.id) ? "ring-2 ring-white" : "opacity-50"}`}>
            {p.name}
          </span>
        ))}
        <button onClick={() => setPlaying((p) => !p)} className="ml-auto rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold hover:bg-white/20">
          {playing ? "⏸ Pause" : "▶ Auto-play"}
        </button>
      </div>

      {/* Pipeline */}
      <div className="relative overflow-x-auto pb-2">
        <div className="flex min-w-[880px] items-center">
          {workflow.map((s, idx) => (
            <div key={s.id} className="flex flex-1 items-center">
              <button
                onClick={() => (setI(idx), setPlaying(false))}
                aria-label={s.title}
                className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-3xl transition"
                style={{
                  background: idx <= i ? s.color : "rgba(255,255,255,0.06)",
                  boxShadow: idx === i ? `0 0 0 4px #fff, 0 0 30px ${s.color}` : "none",
                  transform: idx === i ? "scale(1.12)" : "scale(1)",
                }}
              >
                {s.emoji}
                <span className="absolute -bottom-6 whitespace-nowrap text-[11px] font-semibold text-slate-300">{idx + 1}</span>
              </button>
              {idx < workflow.length - 1 && (
                <svg className="h-4 flex-1" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden>
                  <line x1="0" y1="5" x2="100" y2="5" stroke={idx < i ? s.color : "#ffffff30"} strokeWidth="3" className={idx < i ? "animate-flow" : ""} />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step detail */}
      <div className="mt-8 grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <div className="glass rounded-3xl p-6" style={{ borderColor: step.color }}>
          <div className="text-sm font-bold" style={{ color: step.color }}>STEP {i + 1} OF {workflow.length}</div>
          <div className="font-display mt-1 text-3xl font-bold">{step.emoji} {step.title}</div>
          <p className="mt-3 text-slate-200">{step.detail}</p>
          <div className="mt-5 flex gap-2">
            <button onClick={() => (setI((i - 1 + workflow.length) % workflow.length), setPlaying(false))} className="rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20">← Back</button>
            <button onClick={() => (setI((i + 1) % workflow.length), setPlaying(false))} className="rounded-full px-4 py-2 font-bold text-slate-950" style={{ background: step.color }}>Next →</button>
          </div>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 ring-1 ring-white/10">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">What the product looks like now</div>
          <div className="font-display mt-2 text-2xl font-bold" style={{ color: step.color }}>{step.form}</div>
          <div className="mt-5 space-y-2">
            {workflow.slice(0, i + 1).map((s) => (
              <div key={s.id} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                {s.form}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transformation summary */}
      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {[
          ["🌞 → 🪞", "Photons", "Free sunlight, always available in orbit"],
          ["🪞 → 🔦", "Beam", "Redirected into a steerable 5 km spotlight"],
          ["🔦 → ⚡", "Electricity", "Existing solar panels convert it, no new hardware"],
          ["⚡ → 💰", "Revenue", "Sold at the high-value evening peak"],
        ].map(([icon, title, text], idx) => (
          <div key={title} className={`rounded-2xl p-4 text-slate-950 bg-gradient-to-br ${["from-amber-300 to-orange-400", "from-cyan-300 to-blue-400", "from-yellow-200 to-lime-300", "from-emerald-300 to-teal-400"][idx]}`}>
            <div className="text-2xl">{icon}</div>
            <div className="font-display text-xl font-bold">{title}</div>
            <div className="text-sm">{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
