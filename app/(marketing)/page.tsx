import { Hero } from './_components/hero';
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
      <Hero />
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
