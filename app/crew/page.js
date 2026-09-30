import PageHero from "@/components/PageHero";
import CrewRoster from "@/components/CrewRoster";

export const metadata = {
  title: "Crew",
  description:
    "Meet the VOLTEX crew: street, track and adventure riders who test every piece of gear before it ships.",
};

export default function CrewPage() {
  return (
    <>
      <PageHero
        crumb="Crew"
        eyebrow="Sponsored riders"
        lines={[{ text: "The" }, { text: "Crew", outline: true }]}
        description="Three riders, three disciplines, one kit. They break our gear so you don't have to."
        image={{
          src: "/images/heroes/crew.jpg",
          alt: "The three VOLTEX crew riders standing together in a dark garage under blue light",
        }}
      />
      <CrewRoster />
    </>
  );
}