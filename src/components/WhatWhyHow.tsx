"use client";

import { useState } from "react";
import { whatWhyHow } from "@/lib/knowledge";

const keys = ["what", "why", "how"] as const;

export default function WhatWhyHow() {
  const [active, setActive] = useState<(typeof keys)[number]>("what");
  const s = whatWhyHow[active];

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {keys.map((k) => {
          const item = whatWhyHow[k];
          const on = k === active;
          return (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={`rounded-3xl p-5 text-left transition ${on ? `bg-gradient-to-br ${item.color} text-slate-950 shadow-xl scale-[1.02]` : "glass hover:bg-white/10"}`}
            >
              <div className="text-4xl">{item.emoji}</div>
              <div className="font-display mt-2 text-2xl font-bold">{item.title}</div>
            </button>
          );
        })}
      </div>

      <div className="glass mt-5 rounded-3xl p-6 md:p-8">
        <p className={`font-display bg-gradient-to-r ${s.color} bg-clip-text text-2xl font-bold text-transparent md:text-3xl`}>{s.headline}</p>
        <ol className="mt-5 grid gap-3 md:grid-cols-2">
          {s.points.map((p, i) => (
            <li key={p} className="flex gap-3 rounded-2xl bg-white/5 p-4">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${s.color} font-bold text-slate-950`}>{i + 1}</span>
              <span className="text-slate-200">{p}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <Analogy emoji="🪞" title="Bathroom-mirror analogy" text="Tilt a mirror in a sunny window and a patch of light dances on the wall. Reflect Orbital does the same — the window is space and the wall is Earth." />
        <Analogy emoji="🏟️" title="Stadium-light analogy" text="One floodlight is dim from far away. Point hundreds at the same pitch and it becomes day. Brightness scales with the number of mirrors." />
        <Analogy emoji="🚕" title="Ride-share analogy" text="You don't own the car, you book a ride. Customers don't own satellites — they book minutes of light over their location." />
      </div>
    </div>
  );
}

function Analogy({ emoji, title, text }: { emoji: string; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/20 p-4">
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 font-bold text-amber-200">{title}</div>
      <p className="mt-1 text-sm text-slate-300">{text}</p>
    </div>
  );
}
