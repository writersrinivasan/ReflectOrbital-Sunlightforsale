import type { ReactNode } from "react";

export default function Section({
  id,
  kicker,
  title,
  intro,
  children,
}: {
  id: string;
  kicker: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16">
      <div className="text-sm font-bold uppercase tracking-[0.2em] text-pink-300">{kicker}</div>
      <h2 className="font-display mt-2 text-3xl font-bold md:text-5xl">{title}</h2>
      {intro && <p className="mt-3 max-w-3xl text-lg text-slate-300">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
