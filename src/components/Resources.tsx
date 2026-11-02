"use client";

import { useMemo, useState } from "react";
import { resources, type Resource } from "@/lib/knowledge";

const typeIcon: Record<Resource["type"], string> = {
  Company: "🏢", News: "📰", Research: "🔬", Course: "🎓", Book: "📚", Video: "🎬", Organization: "🌐", Reference: "📖",
};
const levelColor: Record<Resource["level"], string> = {
  Beginner: "bg-emerald-300 text-slate-950",
  Intermediate: "bg-amber-300 text-slate-950",
  Advanced: "bg-pink-400 text-slate-950",
};

const topics = ["All", ...Array.from(new Set(resources.map((r) => r.topic)))];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const paths = [
  { title: "🌱 30-minute starter", steps: ["Reflect Orbital (Wikipedia)", "Znamya — Russia's 1990s space mirrors", "The ‘duck curve’ explained (Wikipedia)", "Observers beware: Reflect Orbital's space mirrors approved"] },
  { title: "🔭 Physics deep-dive", steps: ["Solar constant (Wikipedia)", "Étendue — why you can't focus sunlight infinitely", "Sun-synchronous orbit (Wikipedia)", "Atmospheric light pollution by proposed Reflect Orbital space mirrors (arXiv)"] },
  { title: "⚡ Energy-systems thinker", steps: ["IEA — Batteries and Secure Energy Transitions", "Lazard Levelized Cost of Energy+", "NASA OTPS: Space-Based Solar Power report (2024)", "Long Duration Energy Storage Council"] },
];

export default function Resources() {
  const [q, setQ] = useState("");
  const [topic, setTopic] = useState("All");
  const [level, setLevel] = useState("All");

  const list = useMemo(
    () =>
      resources.filter(
        (r) =>
          (topic === "All" || r.topic === topic) &&
          (level === "All" || r.level === level) &&
          `${r.title} ${r.blurb}`.toLowerCase().includes(q.toLowerCase()),
      ),
    [q, topic, level],
  );

  return (
    <div>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {paths.map((p, i) => (
          <div key={p.title} className={`rounded-3xl p-5 text-slate-950 bg-gradient-to-br ${["from-lime-300 to-emerald-400", "from-cyan-300 to-violet-400", "from-amber-300 to-pink-400"][i]}`}>
            <div className="font-display text-xl font-bold">{p.title}</div>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm font-medium">
              {p.steps.map((s) => {
                const r = resources.find((x) => x.title === s);
                return (
                  <li key={s}>
                    {r ? <a href={r.url} target="_blank" rel="noreferrer" className="underline decoration-2 underline-offset-2 hover:opacity-70">{s}</a> : s}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>

      <div className="glass mb-5 flex flex-col gap-3 rounded-3xl p-4 md:flex-row md:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="🔎 Search resources…"
          className="flex-1 rounded-full bg-slate-950/60 px-4 py-2 outline-none ring-1 ring-white/10 focus:ring-amber-300"
        />
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className="rounded-full bg-slate-950/60 px-4 py-2 ring-1 ring-white/10">
          {topics.map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={level} onChange={(e) => setLevel(e.target.value)} className="rounded-full bg-slate-950/60 px-4 py-2 ring-1 ring-white/10">
          {levels.map((l) => <option key={l}>{l}</option>)}
        </select>
        <span className="text-sm text-slate-400">{list.length} of {resources.length}</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <a key={r.url} href={r.url} target="_blank" rel="noreferrer" className="glass group rounded-2xl p-4 transition hover:-translate-y-1 hover:bg-white/10">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">{typeIcon[r.type]} {r.type} · {r.topic}</span>
              <span className={`rounded-full px-2 py-0.5 font-bold ${levelColor[r.level]}`}>{r.level}</span>
            </div>
            <div className="mt-2 font-bold group-hover:text-amber-200">{r.title} ↗</div>
            <p className="mt-1 text-sm text-slate-400">{r.blurb}</p>
          </a>
        ))}
      </div>

      <div className="mt-8 glass rounded-3xl p-6">
        <div className="font-display text-2xl font-bold text-cyan-200">🧪 Research ideas to explore yourself</div>
        <ul className="mt-3 grid gap-2 text-slate-300 md:grid-cols-2">
          <li>• How many mirrors make reflected light cheaper per kWh than a 4-hour battery?</li>
          <li>• How does cloud cover at dusk in Arizona vs. Spain vs. India change the value?</li>
          <li>• What brightness threshold disturbs birds, insects and sea turtles?</li>
          <li>• Could a constellation pause over observatories and dark-sky parks?</li>
          <li>• Mylar vs. other films: reflectivity, degradation and debris in orbit.</li>
          <li>• Who should regulate light delivered across national borders?</li>
        </ul>
      </div>
    </div>
  );
}
