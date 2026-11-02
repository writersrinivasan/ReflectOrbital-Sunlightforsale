import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import WhatWhyHow from "@/components/WhatWhyHow";
import Simulator from "@/components/Simulator";
import Workflow from "@/components/Workflow";
import Timeline from "@/components/Timeline";
import Debate from "@/components/Debate";
import Alternatives from "@/components/Alternatives";
import Resources from "@/components/Resources";
import Quiz from "@/components/Quiz";
import AgentChat from "@/components/AgentChat";
import { LAST_CHECKED } from "@/lib/knowledge";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />

        <Section id="wwh" kicker="Part 1 · The concept" title={<>What, <span className="text-pink-400">why</span> &amp; <span className="text-cyan-300">how</span></>}
          intro="Three questions unlock the whole idea. Tap each card.">
          <WhatWhyHow />
        </Section>

        <Section id="simulator" kicker="Part 2 · Play with the physics" title={<>Be the <span className="text-sunrise">mirror engineer</span></>}
          intro="Change the mirror size, orbit height and number of mirrors. Watch how bright the spot on Earth gets — and why scale is everything.">
          <Simulator />
        </Section>

        <Section id="workflow" kicker="Part 3 · The transformation" title={<>From a photon to a <span className="text-emerald-300">paycheck</span></>}
          intro="Follow sunlight through every step as it turns from free photons into a product, then into electricity, then into revenue.">
          <Workflow />
        </Section>

        <Section id="timeline" kicker="Part 4 · The story" title="100 years of space mirrors"
          intro="Reflect Orbital didn't invent the idea — it is trying to finally make it a business.">
          <Timeline />
        </Section>

        <Section id="debate" kicker="Part 5 · Think critically" title={<>Bright idea or <span className="text-violet-300">light pollution</span>?</>}
          intro="Every big technology has trade-offs. Weigh them, then cast your vote.">
          <Debate />
        </Section>

        <Section id="alternatives" kicker="Part 6 · Other paths" title="Alternatives for power after sunset"
          intro="Reflect Orbital is one answer to a big problem. Here are the competing and complementary ones.">
          <Alternatives />
        </Section>

        <Section id="learn" kicker="Part 7 · Go deeper" title={<>The <span className="text-sunrise">learning library</span></>}
          intro="Curated articles, research papers, courses, books and organisations — with guided paths for beginners to experts.">
          <Resources />
        </Section>

        <Section id="quiz" kicker="Part 8 · Check yourself" title="Quick quiz ✨">
          <Quiz />
        </Section>

        <Section id="agent" kicker="Part 9 · Agentic AI" title={<>Ask <span className="text-cyan-300">Orbi</span>, your AI guide</>}
          intro="Orbi is an AI agent: it decides which tools to use — running the simulator, searching the knowledge base, comparing alternatives — before answering.">
          <AgentChat />
        </Section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-400">
        <p>
          Independent educational project — not affiliated with Reflect Orbital. Company details come from public reporting
          (last checked {LAST_CHECKED}); figures marked &quot;reported&quot; are not independently verified.
        </p>
      </footer>
    </>
  );
}
