import { timeline } from "@/lib/knowledge";

const tagStyle: Record<string, string> = {
  idea: "bg-violet-400 text-slate-950",
  test: "bg-cyan-300 text-slate-950",
  earth: "bg-lime-300 text-slate-950",
  company: "bg-amber-300 text-slate-950",
  rival: "bg-pink-400 text-slate-950",
};
const tagLabel: Record<string, string> = { idea: "Big idea", test: "Space test", earth: "On Earth", company: "Reflect Orbital", rival: "Rival tech" };

export default function Timeline() {
  return (
    <ol className="relative ml-3 border-l-2 border-dashed border-white/20">
      {timeline.map((e) => (
        <li key={e.year + e.title} className="mb-6 ml-6">
          <span className={`absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full ring-4 ring-[#070b1f] ${tagStyle[e.tag].split(" ")[0]}`} />
          <div className="glass rounded-2xl p-4 transition hover:bg-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-xl font-bold text-amber-200">{e.year}</span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${tagStyle[e.tag]}`}>{tagLabel[e.tag]}</span>
            </div>
            <div className="mt-1 font-bold">{e.title}</div>
            <p className="text-sm text-slate-300">{e.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
