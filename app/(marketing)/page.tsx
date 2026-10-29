import { Hero } from './_components/hero';
import { SizzleShowcase } from './_components/sizzle-showcase';
import { Arenas } from './_components/arenas';
import { Hardware } from './_components/hardware';
import { CheatCodes } from './_components/cheat-codes';
import { Real2See } from './_components/real2see';
import { PowerUps } from './_components/powerups';
import { SkillTree } from './_components/skill-tree';
import { Giveaway } from './_components/giveaway';

export default function HomePage() {
  return (
    <>
      {/* ABOVE THE FOLD: PURE SIZZLE (LOCOMOTIVE / DJI / RESN 3-BEAT LAUNCH EXPERIENCE) */}
      <Hero />
      <SizzleShowcase />

      {/* BELOW THE FOLD: FULL INTERACTIVE ENGINEERING, 4 SIMULATORS, GEMINI AI STUDIO & SKILL TREE */}
      <Arenas />
      <Hardware />
      <CheatCodes />
      <Real2See />
      <PowerUps />
      <SkillTree />
      <Giveaway />
    </>
  );
}
