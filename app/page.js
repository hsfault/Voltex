import Hero from "@/components/Hero";
import SpecTicker from "@/components/SpecTicker";
import SuitUp from "@/components/SuitUp";
import NightRun from "@/components/NightRun";
import CrewDeck from "@/components/CrewDeck";
import StatsBand from "@/components/StatsBand";
import PitLaneCTA from "@/components/PitLaneCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <SpecTicker />
      <SuitUp />
      <NightRun />
      <CrewDeck />
      <StatsBand />
      <PitLaneCTA />
    </>
  );
}