import { companyFacts } from "@/lib/knowledge";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="stars absolute inset-0 opacity-70" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-28 md:grid-cols-2 md:pt-32">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1 text-sm font-semibold text-amber-300 ring-1 ring-amber-300/30">
            ☀️ An interactive explainer
          </span>
          <h1 className="font-display mt-4 text-5xl font-bold leading-[1.05] md:text-7xl">
            Sunlight is now <span className="text-sunrise">for sale.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-300 md:text-xl">
            <b className="text-white">Reflect Orbital</b> wants to put giant mirrors in orbit and beam sunlight down to Earth{" "}
            <b className="text-amber-300">after the Sun has set</b> — so solar farms keep producing, rescue teams get light,
            and night becomes optional. Let&apos;s explore how, why, and whether it can work.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#wwh" className="rounded-full bg-gradient-to-r from-amber-400 to-pink-500 px-6 py-3 font-bold text-slate-900 shadow-lg shadow-pink-500/30 transition hover:scale-105">
              Start exploring →
            </a>
            <a href="#agent" className="glass rounded-full px-6 py-3 font-semibold transition hover:bg-white/10">
              🤖 Ask Orbi, the AI guide
            </a>
          </div>
        </div>

        <HeroScene />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {companyFacts.slice(0, 8).map((f, i) => (
            <div key={f.label} className="glass rounded-2xl p-4">
              <div className={`text-xs font-bold uppercase tracking-wider ${["text-amber-300", "text-pink-300", "text-cyan-300", "text-violet-300"][i % 4]}`}>
                {f.label}
              </div>
              <div className="mt-1 text-sm text-slate-200">{f.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroScene() {
  return (
    <svg viewBox="0 0 500 420" className="w-full drop-shadow-2xl" role="img" aria-label="The Sun lights a mirror satellite, which reflects a beam onto a dark city on Earth">
      <defs>
        <radialGradient id="sunG">
          <stop offset="0%" stopColor="#fff7ad" />
          <stop offset="45%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="earthG" x1="0" x2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#2563eb" />
          <stop offset="55%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f0a2e" />
        </linearGradient>
        <linearGradient id="beamG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="spotG">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sun */}
      <circle cx="60" cy="70" r="70" fill="url(#sunG)" className="animate-pulse-glow" />
      <circle cx="60" cy="70" r="30" fill="#fde047" />

      {/* Earth with day/night terminator */}
      <circle cx="250" cy="560" r="300" fill="url(#earthG)" />
      <text x="110" y="330" fill="#bae6fd" fontSize="13" fontWeight="700">DAY ☀️</text>
      <text x="345" y="330" fill="#c4b5fd" fontSize="13" fontWeight="700">NIGHT 🌙</text>

      {/* Orbit ring with mini satellites */}
      <g style={{ transformOrigin: "250px 560px" }} className="animate-orbit">
        <circle cx="250" cy="560" r="400" fill="none" stroke="#ffffff22" strokeDasharray="4 8" />
        {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => (
          <rect key={a} x="248" y="157" width="5" height="5" fill="#a5f3fc" transform={`rotate(${a} 250 560)`} />
        ))}
      </g>

      {/* Incoming sunlight */}
      <line x1="85" y1="85" x2="300" y2="140" stroke="#fde047" strokeWidth="3" className="animate-flow" />
      <line x1="80" y1="100" x2="295" y2="152" stroke="#fde047" strokeWidth="2" opacity="0.6" className="animate-flow" />

      {/* Beam down to the night side */}
      <polygon points="300,150 318,150 395,300 345,305" fill="url(#beamG)" className="animate-pulse-glow" />
      <ellipse cx="370" cy="303" rx="34" ry="9" fill="url(#spotG)" className="animate-pulse-glow" />

      {/* Satellite */}
      <g className="animate-float">
        <rect x="270" y="132" width="20" height="14" rx="3" fill="#e2e8f0" />
        <rect x="292" y="122" width="34" height="34" rx="2" fill="#a5f3fc" stroke="#ecfeff" strokeWidth="2" transform="rotate(25 309 139)" />
        <text x="255" y="118" fill="#ecfeff" fontSize="12" fontWeight="700">mirror satellite</text>
      </g>

      {/* City lights */}
      {[355, 362, 371, 380, 388].map((x, i) => (
        <rect key={x} x={x} y={292 - (i % 3) * 4} width="5" height={10 + (i % 3) * 4} fill="#fde68a" />
      ))}
      <text x="330" y="355" fill="#fde68a" fontSize="12" fontWeight="700">≈5 km spot of light</text>
    </svg>
  );
}
