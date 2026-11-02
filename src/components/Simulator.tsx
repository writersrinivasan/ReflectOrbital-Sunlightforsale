"use client";

import { useState } from "react";
import { fmt, mirrorsNeeded, simulateReflection } from "@/lib/physics";

const presets = [
  { label: "EARENDIL-1 (1 mirror)", side: 18, alt: 625, count: 1 },
  { label: "Znamya-2 (1993)", side: 20, alt: 400, count: 1 },
  { label: "100 mirrors stacked", side: 18, alt: 625, count: 100 },
  { label: "What-if: 54 m × 1,000", side: 54, alt: 625, count: 1000 },
];

export default function Simulator() {
  const [side, setSide] = useState(18);
  const [alt, setAlt] = useState(625);
  const [count, setCount] = useState(1);

  const r = simulateReflection({ mirrorSideM: side, altitudeKm: alt, mirrorCount: count });
  const forSolar = mirrorsNeeded(200, side, alt);
  const glow = Math.min(1, Math.log10(1 + r.lux) / 4);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="glass rounded-3xl p-6">
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => (setSide(p.side), setAlt(p.alt), setCount(p.count))}
              className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold hover:bg-amber-400 hover:text-slate-900"
            >
              {p.label}
            </button>
          ))}
        </div>

        <Slider label="🪞 Mirror size (side)" value={side} unit="m" min={5} max={100} onChange={setSide} />
        <Slider label="🛰️ Orbit altitude" value={alt} unit="km" min={300} max={1200} step={5} onChange={setAlt} />
        <Slider label="✨ Mirrors on the same spot" value={count} unit="" min={1} max={20000} log onChange={setCount} />

        <p className="mt-6 rounded-2xl bg-pink-500/10 p-4 text-sm text-pink-100 ring-1 ring-pink-400/30">
          💡 To give a solar farm a useful boost (<b>~200 W/m²</b>, a fifth of noon sun) with these mirrors you would need about{" "}
          <b className="text-lg text-white">{forSolar.toLocaleString()}</b> of them overlapping the same spot at once.
        </p>
      </div>

      <div className="glass relative overflow-hidden rounded-3xl p-6">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 transition-all duration-500"
          style={{ background: `radial-gradient(ellipse at 50% 100%, rgba(253,224,71,${0.15 + glow * 0.75}), transparent 70%)` }}
        />
        <div className="relative grid grid-cols-2 gap-3">
          <Stat color="text-amber-300" label="Spot diameter" value={`${fmt(r.spotDiameterKm)} km`} />
          <Stat color="text-cyan-300" label="Light on ground" value={`${fmt(r.irradianceWm2, 3)} W/m²`} />
          <Stat color="text-pink-300" label="Brightness" value={`${fmt(r.lux)} lux`} sub={`≈ ${fmt(r.fullMoons)} full moons`} />
          <Stat color="text-violet-300" label="% of noon sun" value={`${fmt(r.percentOfNoon, 3)}%`} />
          <Stat color="text-emerald-300" label="100 MW farm makes" value={`${fmt(r.farmOutputMw, 3)} MW`} />
          <Stat color="text-orange-300" label="Mirror area (each)" value={`${fmt(r.mirrorAreaM2)} m²`} />
        </div>
        <div className="relative mt-5">
          <div className="mb-1 flex justify-between text-xs text-slate-400">
            <span>🌑 starlight</span><span>🌕 full moon</span><span>🌆 dusk</span><span>☀️ noon</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-amber-300 transition-all duration-500"
              style={{ width: `${Math.min(100, (Math.log10(1 + r.lux) / Math.log10(100001)) * 100)}%` }}
            />
          </div>
        </div>
        <p className="relative mt-4 text-xs text-slate-400">
          Model: spot = altitude × 0.0093 rad (Sun&apos;s angular size) + mirror size; 1,361 W/m² sunlight, 90% reflectivity,
          75% atmospheric transmission, satellite directly overhead. Real passes are slanted, so spots get bigger and dimmer.
        </p>
      </div>
    </div>
  );
}

function Slider({ label, value, unit, min, max, step = 1, log, onChange }: {
  label: string; value: number; unit: string; min: number; max: number; step?: number; log?: boolean; onChange: (v: number) => void;
}) {
  const toPos = (v: number) => (log ? (Math.log(v) - Math.log(min)) / (Math.log(max) - Math.log(min)) * 1000 : v);
  const fromPos = (p: number) => (log ? Math.round(Math.exp(Math.log(min) + (p / 1000) * (Math.log(max) - Math.log(min)))) : p);
  return (
    <label className="mt-5 block">
      <div className="flex justify-between font-semibold">
        <span>{label}</span>
        <span className="text-amber-300">{value.toLocaleString()} {unit}</span>
      </div>
      <input
        type="range"
        className="mt-2 w-full"
        min={log ? 0 : min}
        max={log ? 1000 : max}
        step={log ? 1 : step}
        value={toPos(value)}
        onChange={(e) => onChange(fromPos(Number(e.target.value)))}
      />
    </label>
  );
}

function Stat({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className="rounded-2xl bg-slate-950/50 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-400">{label}</div>
      <div className={`font-display mt-1 text-2xl font-bold ${color}`}>{value}</div>
      {sub && <div className="text-xs text-slate-400">{sub}</div>}
    </div>
  );
}
