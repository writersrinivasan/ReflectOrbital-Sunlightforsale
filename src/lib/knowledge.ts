// Single source of truth for the site AND the AI agent's tools.
// Company facts are from public reporting up to late 2026; numbers marked
// "reported" come from news coverage or company statements, not audited data.

export const LAST_CHECKED = "November 2026";

export const companyFacts = [
  { label: "Company", value: "Reflect Orbital (Hawthorne / Los Angeles area, California)" },
  { label: "Founders", value: "Ben Nowack (CEO, ex-SpaceX) and Tristan Semmelhack" },
  { label: "Pitch", value: "“Sunlight on demand”: sell reflected sunlight from orbit, after sunset and before sunrise" },
  { label: "Funding (reported)", value: "≈ $6.5M seed (Sept 2024, led by Sequoia) + $20M Series A (May 2025, led by Lux Capital); ≈ $35M total incl. a US Air Force SBIR award" },
  { label: "First satellite", value: "EARENDIL-1: one ~18 × 18 m Mylar-style mirror, ~625 km orbit, 88° inclination" },
  { label: "Regulatory", value: "FCC approved EARENDIL-1 on 9 July 2026 and denied the American Astronomical Society's petition against it" },
  { label: "Launch status", value: "Not launched as of the latest public reports; booked on a SpaceX rideshare, date not announced" },
  { label: "Stated ambition (reported)", value: "~1,000 satellites by end of 2028, ~5,000 by 2030, ~50,000 by 2035" },
];

export const whatWhyHow = {
  what: {
    title: "WHAT is being sold?",
    emoji: "☀️",
    color: "from-amber-400 to-orange-500",
    headline: "Not electricity. Not panels. Sunlight itself — delivered on a schedule.",
    points: [
      "A fleet of satellites carries large, thin, lightweight mirrors.",
      "From orbit they can still see the Sun when the ground below is already dark (dusk) or not yet light (dawn).",
      "Each mirror tilts to bounce a beam of sunlight onto a chosen spot on Earth about 5 km wide.",
      "Customers buy that light by the session: a solar farm that keeps producing after sunset, a disaster zone that needs light, a construction site, a farm.",
      "Think of it as a ‘light-as-a-service’ subscription: you order the beam, the constellation delivers it, you pay for the minutes.",
    ],
  },
  why: {
    title: "WHY would anyone do this?",
    emoji: "💡",
    color: "from-pink-500 to-fuchsia-600",
    headline: "Solar panels already exist everywhere — they just sit idle for half of every day.",
    points: [
      "The world has installed well over 2 terawatts of solar panels. At night all of it produces zero.",
      "Electricity demand peaks in the early evening — exactly when solar output collapses (the famous ‘duck curve’). Evening power is the most expensive power.",
      "Batteries help, but they cost money and store only what was generated earlier. Reflected light makes the existing panels generate more, with no new land or panels.",
      "Even a modest boost at dawn and dusk is valuable, because that is when prices are highest and panels are weakest.",
      "Beyond energy: lighting for disaster relief, search and rescue, night-time construction, agriculture, and defence (the US Air Force funded an SBIR study).",
      "Business logic: build once in orbit, sell the same mirror's light to many customers on many passes around the planet every day.",
    ],
  },
  how: {
    title: "HOW does it physically work?",
    emoji: "🛰️",
    color: "from-cyan-400 to-blue-600",
    headline: "Orbital mechanics + a giant mirror + precise pointing = a moving spotlight from space.",
    points: [
      "Orbit: a low-Earth, near-polar orbit (~600 km) close to the day/night line (the terminator), so the satellite is sunlit while towns below are in twilight or night.",
      "Unfold: the mirror launches folded and unfurls to its full size in space — huge area, very little mass.",
      "Aim: the satellite rotates so the mirror's angle sits halfway between the Sun and the target — the same rule as a bathroom mirror.",
      "Track: the satellite races by at ~7.5 km/s, so it continuously re-tilts to keep the beam on the target for a few minutes.",
      "Hand off: as one satellite sets below the horizon, the next one in the constellation picks up the target. Many satellites can also overlap on one spot to stack brightness.",
      "Physics limit: a flat mirror can't make a spot smaller than the Sun's angular size (~0.53°) times the distance → roughly a 5–6 km spot from 625 km up. Brightness per mirror is therefore low — around one full moon or a few, not daylight.",
    ],
  },
};

export type WorkflowStep = {
  id: string;
  title: string;
  emoji: string;
  color: string;
  form: string; // what the "product" looks like at this stage
  detail: string;
};

export const workflow: WorkflowStep[] = [
  { id: "sun", title: "The Sun shines", emoji: "🌞", color: "#f59e0b", form: "Raw photons · 1,361 W/m² in space", detail: "Sunlight travels 150 million km in about 8 minutes. In orbit there is no night, clouds or atmosphere to block it." },
  { id: "order", title: "Customer orders light", emoji: "📱", color: "#ec4899", form: "A request: place + time + duration", detail: "A solar farm operator (or a rescue team, or a city) asks for light over a location at a time — for example 30 minutes after sunset." },
  { id: "plan", title: "Constellation plans the pass", emoji: "🧭", color: "#8b5cf6", form: "Schedule of satellites & angles", detail: "Software works out which satellites will be in view, in what order, and the exact mirror angle needed for every second of the pass." },
  { id: "catch", title: "Mirror catches sunlight", emoji: "🪞", color: "#06b6d4", form: "Collected light on ~324 m² of mirror", detail: "The unfolded mirror (≈18 × 18 m on the first satellite) sits in full sunlight even though the ground below is dark." },
  { id: "aim", title: "Satellite aims & tracks", emoji: "🎯", color: "#3b82f6", form: "A steerable beam", detail: "Reaction wheels rotate the satellite so the mirror bisects the Sun–target angle, constantly correcting as it flies at ~7.5 km/s." },
  { id: "beam", title: "Beam crosses ~600+ km", emoji: "🔦", color: "#10b981", form: "A spotlight ~5 km wide", detail: "The beam spreads by the Sun's angular size, so it lands as a soft-edged disc of light several kilometres across. The atmosphere absorbs a slice of it." },
  { id: "land", title: "Light lands on target", emoji: "🌆", color: "#f97316", form: "Extra W/m² on the ground", detail: "Panels (or people) inside the spot receive extra light — dim for one mirror, brighter as more mirrors stack onto the same spot." },
  { id: "convert", title: "Panels convert to power", emoji: "⚡", color: "#eab308", form: "DC → inverter → AC electricity", detail: "Solar cells convert ~20% of the light into DC current; inverters turn it into grid AC. No new hardware is needed at the farm." },
  { id: "sell", title: "Power sold at peak price", emoji: "💰", color: "#22c55e", form: "Revenue for farm & Reflect Orbital", detail: "Evening electricity is the most valuable of the day. The farm earns extra, and pays Reflect Orbital for the delivered light." },
  { id: "handoff", title: "Hand off & repeat", emoji: "🔁", color: "#a855f7", form: "Continuous service", detail: "As one satellite sets, the next takes over. Each satellite circles Earth ~15 times a day, serving many customers on each lap." },
];

export const timeline = [
  { year: "1923", title: "Hermann Oberth imagines space mirrors", text: "The rocket pioneer suggests giant orbital mirrors to light cities and even influence weather.", tag: "idea" },
  { year: "1968", title: "Peter Glaser: power from space", text: "Glaser proposes space-based solar power — collecting sunlight in orbit and beaming it down as microwaves.", tag: "idea" },
  { year: "1970s", title: "Krafft Ehricke's ‘Space Light’", text: "Concepts like ‘Lunetta’ (night lighting) and ‘Power Soletta’ (lighting solar plants) — essentially today's business plan, 50 years early.", tag: "idea" },
  { year: "1993", title: "Russia's Znamya-2 flies", text: "A 20 m mirror unfolded from the Mir supply ship and swept a ~5 km bright spot across Europe at night — proof it physically works.", tag: "test" },
  { year: "1999", title: "Znamya-2.5 fails", text: "A bigger 25 m mirror snagged on an antenna during deployment. The programme was cancelled.", tag: "test" },
  { year: "2006–13", title: "Mirrors light dark towns", text: "Viganella (Italy) and Rjukan (Norway) install mountain-top mirrors to bounce winter sun into valleys — ground-based cousins of the idea.", tag: "earth" },
  { year: "2021", title: "Reflect Orbital is founded", text: "Ben Nowack and Tristan Semmelhack start the company; early tests use mirrors carried by hot-air balloons to light solar panels.", tag: "company" },
  { year: "2023", title: "Caltech beams power in space", text: "Caltech's MAPLE experiment wirelessly transmits power in orbit and detects it on Earth — a milestone for the rival microwave approach.", tag: "rival" },
  { year: "Sep 2024", title: "$6.5M seed round", text: "Led by Sequoia (reported).", tag: "company" },
  { year: "May 2025", title: "$20M Series A", text: "Led by Lux Capital with Sequoia and Starship Ventures (reported).", tag: "company" },
  { year: "Jul 2026", title: "FCC approves EARENDIL-1", text: "One 18 × 18 m mirror satellite at ~625 km. The FCC rejects the astronomers' petition; DarkSky and allies ask it to reverse.", tag: "company" },
  { year: "2026 →", title: "Awaiting launch", text: "Booked on a SpaceX rideshare; the date has slipped and no date has been confirmed in public reports.", tag: "company" },
  { year: "2028–35", title: "Stated scale-up", text: "Reported goals: ~1,000 satellites by 2028, ~5,000 by 2030, ~50,000 by 2035.", tag: "company" },
];

export const debate = {
  pros: [
    { title: "Uses existing panels", text: "Trillions of dollars of solar farms already exist. More hours of output means more value from the same assets." },
    { title: "Targets the peak", text: "Dawn and dusk are when grids are stressed and power is priciest — a little light there is worth a lot." },
    { title: "Flexible & global", text: "The same mirror can serve Arizona at dusk and Spain at dawn on later passes." },
    { title: "Humanitarian light", text: "Instant light for earthquakes, wildfires or blackouts without trucking in generators." },
    { title: "Light is mass-cheap", text: "Thin reflective film weighs little per square metre, and launch costs keep falling." },
  ],
  cons: [
    { title: "Faint per mirror", text: "One 18 m mirror at 625 km gives roughly 1 lux — a few full moons. Solar farms need hundreds of W/m², which implies thousands of overlapping mirrors." },
    { title: "Dark-sky & astronomy", text: "Astronomers warn of bright flashes, sky-glow and ruined observations. The AAS, DarkSky International and others formally objected." },
    { title: "Ecology & health", text: "Artificial night light disrupts birds, insects, sea turtles and human sleep (circadian rhythms)." },
    { title: "Aviation & eye safety", text: "The Air Line Pilots Association said aircraft glare risks weren't adequately analysed." },
    { title: "Clouds & atmosphere", text: "A cloudy evening blocks the beam; the atmosphere absorbs a share even on clear days." },
    { title: "Orbital crowding", text: "Tens of thousands of large, flat satellites add to collision and debris risk in low Earth orbit." },
    { title: "Who owns the night?", text: "Space law (the Outer Space Treaty, ITU, national licences) never anticipated someone selling night-time light over other people's skies." },
  ],
};

export type Alternative = {
  name: string;
  emoji: string;
  category: "Space" | "Storage" | "Grid" | "Generation";
  howItWorks: string;
  maturity: string;
  vsReflect: string;
  players: string;
};

export const alternatives: Alternative[] = [
  { name: "Space-based solar power (microwave)", emoji: "📡", category: "Space", howItWorks: "Huge solar arrays in orbit convert sunlight to microwaves/lasers and beam it to ground receiving antennas (rectennas).", maturity: "Early demos (Caltech MAPLE 2023); full systems are decades and billions away.", vsReflect: "Delivers electricity directly, 24/7, through clouds — but needs new ground receivers and much heavier satellites.", players: "Caltech SSPP, ESA SOLARIS, JAXA, China (CAST), Space Solar (UK), Aetherflux, Virtus Solis" },
  { name: "Lithium-ion grid batteries", emoji: "🔋", category: "Storage", howItWorks: "Store daytime solar in batteries and discharge in the evening peak.", maturity: "Mature, rapidly scaling, prices falling year after year.", vsReflect: "The direct competitor for the evening peak; works in any weather and is already cheap — but only shifts energy, doesn't create more.", players: "Tesla Megapack, Fluence, CATL, BYD" },
  { name: "Long-duration storage", emoji: "🧱", category: "Storage", howItWorks: "Iron-air, flow batteries, compressed air, thermal bricks — store energy for 10–100+ hours.", maturity: "Pilot to early commercial.", vsReflect: "Covers multi-day gaps that a few minutes of reflected light never could.", players: "Form Energy, ESS, Hydrostor, Rondo, Antora" },
  { name: "Pumped hydro", emoji: "💧", category: "Storage", howItWorks: "Pump water uphill with surplus power, release through turbines later.", maturity: "Mature — the world's largest form of grid storage.", vsReflect: "Huge capacity and long life, but needs specific geography.", players: "Utilities worldwide" },
  { name: "Concentrated solar power + molten salt", emoji: "🔥", category: "Generation", howItWorks: "Ground mirrors focus sun onto a tower; heat stored in molten salt runs turbines after dark.", maturity: "Commercial in Spain, Morocco, Chile, China, UAE.", vsReflect: "Also ‘mirrors for night power’, but on the ground with thermal storage.", players: "Noor Ouarzazate, Cerro Dominador, Dubai DEWA" },
  { name: "Global HVDC super-grids", emoji: "🌍", category: "Grid", howItWorks: "Long high-voltage DC cables move daytime solar to places where it's evening.", maturity: "Large HVDC links exist; intercontinental links are proposed.", vsReflect: "Moves the electricity instead of the sunlight — no light pollution, but huge infrastructure and politics.", players: "Xlinks (Morocco–UK), Sun Cable (Australia–Asia), State Grid China" },
  { name: "Wind, geothermal, nuclear", emoji: "🌬️", category: "Generation", howItWorks: "Clean sources that keep running at night.", maturity: "Mature (wind, nuclear); next-gen geothermal and SMRs emerging.", vsReflect: "Firm night-time power without touching the sky.", players: "Fervo (geothermal), NuScale/TerraPower (nuclear), offshore wind developers" },
  { name: "Demand flexibility", emoji: "🏠", category: "Grid", howItWorks: "Shift EV charging, heating and industrial loads to sunny hours via smart pricing.", maturity: "Growing quickly with smart meters and EVs.", vsReflect: "Cheapest option: change when we use power rather than when the Sun shines.", players: "Octopus Energy, OhmConnect, virtual power plants" },
];

export type Resource = {
  title: string;
  url: string;
  type: "Company" | "News" | "Research" | "Course" | "Book" | "Video" | "Organization" | "Reference";
  topic: "Reflect Orbital" | "Space solar" | "Physics & orbits" | "Dark skies" | "Energy storage" | "Solar energy" | "History" | "Policy & law";
  level: "Beginner" | "Intermediate" | "Advanced";
  blurb: string;
};

export const resources: Resource[] = [
  // Reflect Orbital
  { title: "Reflect Orbital — official site", url: "https://www.reflectorbital.com", type: "Company", topic: "Reflect Orbital", level: "Beginner", blurb: "The company's own pitch, visuals and mission updates." },
  { title: "Reflect Orbital (Wikipedia)", url: "https://en.wikipedia.org/wiki/Reflect_Orbital", type: "Reference", topic: "Reflect Orbital", level: "Beginner", blurb: "Timeline, funding and controversy summary with citations." },
  { title: "Reflect Orbital cleared to fly in-orbit mirror by FCC", url: "https://payloadspace.com/reflect-orbital-cleared-to-fly-in-orbit-mirror-by-fcc/", type: "News", topic: "Reflect Orbital", level: "Intermediate", blurb: "Space-industry coverage of the July 2026 FCC decision." },
  { title: "Observers beware: Reflect Orbital's space mirrors approved", url: "https://skyandtelescope.org/astronomy-news/observers-beware-reflect-orbitals-space-mirrors-approved-for-launch/", type: "News", topic: "Dark skies", level: "Beginner", blurb: "Sky & Telescope on what sky-watchers might see." },
  { title: "Astronomers fire back at FCC approval of EARENDIL-1", url: "https://thedebrief.org/sunlight-at-night-astronomers-fire-back-at-controversial-fcc-approval-of-reflect-orbitals-earendil-1-mirror-satellite/", type: "News", topic: "Dark skies", level: "Beginner", blurb: "The astronomy community's response, explained." },
  { title: "Who owns the night sky? (Minnesota Journal of Law, Science & Technology)", url: "https://journals.law.umn.edu/mjlst/2026/04/21/who-owns-the-night-sky-reflect-orbital-wants-to-sell-sunlight-from-space", type: "Research", topic: "Policy & law", level: "Intermediate", blurb: "Legal analysis of selling sunlight from space." },
  { title: "Selling the Sun: satellite mirrors for solar farms (Washington Times)", url: "https://m.washingtontimes.com/news/2025/oct/22/selling-sun-us-company-building-satellite-mirrors-keep-solar-farms/", type: "News", topic: "Reflect Orbital", level: "Beginner", blurb: "Mainstream explainer of the business model." },
  { title: "Video search: Reflect Orbital demos & interviews", url: "https://www.youtube.com/results?search_query=Reflect+Orbital+sunlight", type: "Video", topic: "Reflect Orbital", level: "Beginner", blurb: "Balloon tests, founder interviews and news segments." },

  // Dark skies / science
  { title: "Atmospheric light pollution by proposed Reflect Orbital space mirrors (arXiv)", url: "https://arxiv.org/abs/2608.06433", type: "Research", topic: "Dark skies", level: "Advanced", blurb: "Models brightness (~1 lux, magnitude ≈ −14) and sky-glow from one mirror." },
  { title: "DarkSky asks the FCC to reverse its approval", url: "https://darksky.org/news/darksky-and-allies-ask-the-fcc-to-reverse-its-approval-of-the-reflect-orbital-space-mirror/", type: "Organization", topic: "Dark skies", level: "Beginner", blurb: "The conservation case against space mirrors." },
  { title: "IAU Centre for the Protection of the Dark and Quiet Sky", url: "https://cps.iau.org", type: "Organization", topic: "Dark skies", level: "Intermediate", blurb: "Global astronomy body tracking satellite impacts on the sky." },

  // Space solar
  { title: "Space-based solar power (Wikipedia)", url: "https://en.wikipedia.org/wiki/Space-based_solar_power", type: "Reference", topic: "Space solar", level: "Beginner", blurb: "The microwave-beaming rival concept, history and programmes." },
  { title: "Caltech Space Solar Power Project", url: "https://www.spacesolar.caltech.edu", type: "Research", topic: "Space solar", level: "Intermediate", blurb: "MAPLE, the first in-space wireless power demo detected on Earth." },
  { title: "ESA SOLARIS initiative", url: "https://www.esa.int/Enabling_Support/Space_Engineering_Technology/SOLARIS", type: "Organization", topic: "Space solar", level: "Intermediate", blurb: "Europe's feasibility study for space-based solar power." },
  { title: "NASA OTPS: Space-Based Solar Power report (2024)", url: "https://www.nasa.gov/organizations/otps/space-based-solar-power-report/", type: "Research", topic: "Space solar", level: "Advanced", blurb: "Cost–benefit analysis comparing SBSP designs to terrestrial clean energy." },
  { title: "Aetherflux", url: "https://www.aetherflux.com", type: "Company", topic: "Space solar", level: "Beginner", blurb: "Startup beaming power from LEO with infrared lasers." },
  { title: "Space mirror concepts (Wikipedia)", url: "https://en.wikipedia.org/wiki/Space_mirror_(geoengineering)", type: "Reference", topic: "Space solar", level: "Intermediate", blurb: "Mirrors in space for lighting and climate ideas." },

  // Physics & orbits
  { title: "Solar constant (Wikipedia)", url: "https://en.wikipedia.org/wiki/Solar_constant", type: "Reference", topic: "Physics & orbits", level: "Beginner", blurb: "Why sunlight in space is 1,361 W/m²." },
  { title: "Étendue — why you can't focus sunlight infinitely", url: "https://en.wikipedia.org/wiki/Etendue", type: "Reference", topic: "Physics & orbits", level: "Advanced", blurb: "The optics law that sets the ~5 km spot size." },
  { title: "Sun-synchronous orbit (Wikipedia)", url: "https://en.wikipedia.org/wiki/Sun-synchronous_orbit", type: "Reference", topic: "Physics & orbits", level: "Intermediate", blurb: "The ‘dawn–dusk’ orbits that keep satellites on the terminator." },
  { title: "NASA — Basics of Space Flight", url: "https://science.nasa.gov/learn/basics-of-space-flight/", type: "Course", topic: "Physics & orbits", level: "Beginner", blurb: "Free primer on orbits, attitude control and spacecraft." },

  // History
  { title: "Znamya — Russia's 1990s space mirrors", url: "https://en.wikipedia.org/wiki/Znamya_(satellite)", type: "Reference", topic: "History", level: "Beginner", blurb: "The 1993 experiment that actually lit up Europe from orbit." },
  { title: "Rjukan — the Norwegian town lit by mirrors", url: "https://en.wikipedia.org/wiki/Rjukan", type: "Reference", topic: "History", level: "Beginner", blurb: "Mountain mirrors bring winter sun into a shadowed valley." },
  { title: "Viganella — the Italian village with a mirror sun", url: "https://en.wikipedia.org/wiki/Viganella", type: "Reference", topic: "History", level: "Beginner", blurb: "A 40 m² mirror ending 83 sunless winter days." },
  { title: "The High Frontier — Gerard K. O'Neill (1976)", url: "https://en.wikipedia.org/wiki/The_High_Frontier:_Human_Colonies_in_Space", type: "Book", topic: "History", level: "Intermediate", blurb: "Classic vision of space industry and orbital solar power." },
  { title: "Peter Glaser, ‘Power from the Sun: Its Future’ (Science, 1968)", url: "https://scholar.google.com/scholar?q=Glaser+1968+Power+from+the+Sun+Its+Future", type: "Research", topic: "History", level: "Advanced", blurb: "The founding paper of space-based solar power." },
  { title: "Krafft Ehricke ‘Space Light’ & Soletta papers", url: "https://scholar.google.com/scholar?q=Ehricke+Soletta+Lunetta+space+light", type: "Research", topic: "History", level: "Advanced", blurb: "1970s proposals for orbital mirrors lighting cities and solar plants." },

  // Solar & storage
  { title: "MIT OCW — Fundamentals of Photovoltaics", url: "https://ocw.mit.edu/courses/2-627-fundamentals-of-photovoltaics-fall-2013/", type: "Course", topic: "Solar energy", level: "Intermediate", blurb: "Full free course on how solar cells turn light into current." },
  { title: "NREL Solar research", url: "https://www.nrel.gov/solar/", type: "Organization", topic: "Solar energy", level: "Intermediate", blurb: "US national lab data on solar efficiency, cost and grids." },
  { title: "IEA — Renewables", url: "https://www.iea.org/energy-system/renewables", type: "Organization", topic: "Solar energy", level: "Beginner", blurb: "Global solar growth statistics and forecasts." },
  { title: "IEA — Batteries and Secure Energy Transitions", url: "https://www.iea.org/reports/batteries-and-secure-energy-transitions", type: "Research", topic: "Energy storage", level: "Intermediate", blurb: "How batteries are taking over the evening peak." },
  { title: "Lazard Levelized Cost of Energy+", url: "https://www.lazard.com/research-insights/levelized-cost-of-energyplus/", type: "Research", topic: "Energy storage", level: "Advanced", blurb: "Annual cost comparison of solar, storage and other generation." },
  { title: "Long Duration Energy Storage Council", url: "https://www.ldescouncil.com", type: "Organization", topic: "Energy storage", level: "Intermediate", blurb: "Industry reports on multi-day storage technologies." },
  { title: "US DOE — Concentrating solar-thermal power basics", url: "https://www.energy.gov/eere/solar/concentrating-solar-thermal-power-basics", type: "Course", topic: "Solar energy", level: "Beginner", blurb: "Ground mirrors + molten salt = solar power at night." },
  { title: "The ‘duck curve’ explained (Wikipedia)", url: "https://en.wikipedia.org/wiki/Duck_curve", type: "Reference", topic: "Solar energy", level: "Beginner", blurb: "Why evening electricity is so valuable." },

  // Policy & law
  { title: "Outer Space Treaty (UNOOSA)", url: "https://www.unoosa.org/oosa/en/ourwork/spacelaw/treaties/outerspacetreaty.html", type: "Reference", topic: "Policy & law", level: "Intermediate", blurb: "The 1967 treaty underpinning all space activity." },
  { title: "Scholar search: orbital reflectors & light pollution", url: "https://scholar.google.com/scholar?q=orbital+reflector+satellite+light+pollution", type: "Research", topic: "Dark skies", level: "Advanced", blurb: "Jump into peer-reviewed literature on the topic." },
];

export const quiz = [
  { q: "What does Reflect Orbital actually sell?", options: ["Solar panels", "Electricity via cables", "Reflected sunlight from orbit", "Batteries"], answer: 2, why: "They sell the light itself — beamed by mirrors in orbit onto a customer's location." },
  { q: "Why can a satellite reflect sunlight when the ground below is dark?", options: ["It has a lamp", "It's high enough to still see the Sun", "It stores light", "The Moon helps"], answer: 1, why: "At ~600 km up, the satellite is still in sunlight after sunset on the ground below." },
  { q: "Roughly how wide is the light spot from EARENDIL-1?", options: ["5 metres", "500 metres", "~5 kilometres", "500 kilometres"], answer: 2, why: "A flat mirror can't beat the Sun's 0.53° angular size: 625 km × 0.0093 ≈ 5.8 km." },
  { q: "How bright is ONE 18 m mirror's light on the ground?", options: ["Like noon", "Like a cloudy day", "About a few full moons (~1 lux)", "Invisible"], answer: 2, why: "Modelling suggests ~1 lux — useful for lighting, but far too dim alone for solar power." },
  { q: "What is the strongest competitor for the evening power peak today?", options: ["Candles", "Grid batteries", "Coal", "Moonlight"], answer: 1, why: "Lithium-ion batteries are cheap, mature and scaling fast for exactly this job." },
  { q: "Who formally objected to the FCC licence?", options: ["NASA", "The American Astronomical Society", "SpaceX", "The UN"], answer: 1, why: "The AAS petitioned to deny; DarkSky International and pilots' unions also raised concerns." },
];

export function searchKnowledge(topic: string) {
  const t = topic.toLowerCase();
  const hit = (s: string) => t.split(/\s+/).some((w) => w.length > 2 && s.toLowerCase().includes(w));
  return {
    lastChecked: LAST_CHECKED,
    companyFacts: companyFacts.filter((f) => hit(f.label + f.value)),
    whatWhyHow: Object.values(whatWhyHow)
      .map((s) => ({ title: s.title, points: s.points.filter(hit) }))
      .filter((s) => s.points.length),
    workflow: workflow.filter((w) => hit(w.title + w.detail + w.form)),
    timeline: timeline.filter((e) => hit(e.year + e.title + e.text)),
    pros: debate.pros.filter((d) => hit(d.title + d.text)),
    cons: debate.cons.filter((d) => hit(d.title + d.text)),
  };
}
