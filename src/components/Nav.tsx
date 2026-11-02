const links = [
  ["wwh", "What · Why · How"],
  ["simulator", "Simulator"],
  ["workflow", "Workflow"],
  ["timeline", "Timeline"],
  ["debate", "Debate"],
  ["alternatives", "Alternatives"],
  ["learn", "Learn"],
  ["quiz", "Quiz"],
  ["agent", "Ask Orbi"],
];

export default function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#070b1f]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <a href="#top" className="font-display shrink-0 text-lg font-bold">
          <span className="text-sunrise">Sunlight</span>4Sale
        </a>
        <div className="flex gap-1 overflow-x-auto text-sm [scrollbar-width:none]">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap rounded-full px-3 py-1.5 text-slate-300 transition hover:bg-white/10 hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
