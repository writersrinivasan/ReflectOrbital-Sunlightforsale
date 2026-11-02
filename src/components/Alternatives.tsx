"use client";

import { useState } from "react";
import { alternatives } from "@/lib/knowledge";

const cats = ["All", "Space", "Storage", "Grid", "Generation"] as const;
const catColor: Record<string, string> = {
  Space: "from-cyan-400 to-blue-500",
  Storage: "from-emerald-400 to-teal-500",
  Grid: "from-violet-400 to-purple-500",
  Generation: "from-orange-400 to-pink-500",
};

export default function Alternatives() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = cat === "All" ? alternatives : alternatives.filter((a) => a.category === cat);

  return (
    <div>
      <div className="glass mb-6 rounded-3xl p-5">
        <div className="font-bold text-amber-200">🧩 The core question every alternative answers</div>
        <p className="mt-1 text-slate-300">
          “How do we get clean power when the Sun isn&apos;t shining on the panels?” Reflect Orbital moves <b>light</b>. Others move{" "}
          <b>energy through time</b> (storage), <b>energy through space</b> (grids, beamed power), or <b>don&apos;t need the Sun</b> at all.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-1.5 text-sm font-bold ${cat === c ? "bg-white text-slate-900" : "bg-white/10 hover:bg-white/20"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((a) => (
          <article key={a.name} className="glass overflow-hidden rounded-3xl">
            <div className={`bg-gradient-to-r ${catColor[a.category]} px-5 py-3 text-slate-950`}>
              <span className="text-2xl">{a.emoji}</span> <span className="font-display text-xl font-bold">{a.name}</span>
              <span className="float-right mt-1 rounded-full bg-slate-950/20 px-2 py-0.5 text-xs font-bold">{a.category}</span>
            </div>
            <dl className="space-y-2 p-5 text-sm">
              <Row k="How it works" v={a.howItWorks} />
              <Row k="Maturity" v={a.maturity} />
              <Row k="Vs. Reflect Orbital" v={a.vsReflect} highlight />
              <Row k="Who's doing it" v={a.players} />
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className={highlight ? "rounded-xl bg-amber-300/10 p-2" : ""}>
      <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{k}</dt>
      <dd className="text-slate-200">{v}</dd>
    </div>
  );
}
