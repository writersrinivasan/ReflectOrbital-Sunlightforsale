"use client";

import { useState } from "react";
import { debate } from "@/lib/knowledge";

const verdicts = [
  { id: "go", label: "🚀 Go for it", color: "from-emerald-400 to-cyan-400" },
  { id: "test", label: "🧪 Test, then decide", color: "from-amber-300 to-orange-400" },
  { id: "stop", label: "🌌 Protect the night", color: "from-violet-400 to-pink-500" },
];

export default function Debate() {
  const [vote, setVote] = useState<string | null>(null);

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2">
        <Column title="The case FOR" emoji="👍" ring="ring-emerald-400/40" accent="text-emerald-300" items={debate.pros} />
        <Column title="The case AGAINST" emoji="⚠️" ring="ring-pink-400/40" accent="text-pink-300" items={debate.cons} />
      </div>

      <div className="glass mt-6 rounded-3xl p-6 text-center">
        <div className="font-display text-2xl font-bold">Your verdict?</div>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {verdicts.map((v) => (
            <button
              key={v.id}
              onClick={() => setVote(v.id)}
              className={`rounded-full px-5 py-2.5 font-bold transition ${vote === v.id ? `bg-gradient-to-r ${v.color} text-slate-950 scale-105` : "bg-white/10 hover:bg-white/20"}`}
            >
              {v.label}
            </button>
          ))}
        </div>
        {vote && (
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            {vote === "go" && "Optimist! The physics works (Znamya proved it in 1993). The open question is whether thousands of mirrors can be cheaper than batteries."}
            {vote === "test" && "That's roughly what the FCC did: allow one test satellite and judge real-world brightness, safety and value before any constellation."}
            {vote === "stop" && "You're in good company with many astronomers and ecologists: the night sky is a shared heritage, and dark nights matter for wildlife and sleep."}
          </p>
        )}
      </div>
    </div>
  );
}

function Column({ title, emoji, ring, accent, items }: { title: string; emoji: string; ring: string; accent: string; items: { title: string; text: string }[] }) {
  return (
    <div className={`glass rounded-3xl p-6 ring-1 ${ring}`}>
      <div className={`font-display text-2xl font-bold ${accent}`}>{emoji} {title}</div>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it.title} className="rounded-2xl bg-white/5 p-4">
            <div className={`font-bold ${accent}`}>{it.title}</div>
            <div className="text-sm text-slate-300">{it.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
