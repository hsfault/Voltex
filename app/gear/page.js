import PageHero from "@/components/PageHero";
import GearCatalog from "@/components/GearCatalog";
import { CATEGORIES } from "@/data/gear";

export const metadata = {
  title: "Gear",
  description:
    "The full VOLTEX Season 01 catalog: helmets, jackets, gloves and boots built for the street, the canyon and the track.",
};

export default async function GearPage({ searchParams }) {
  const params = await searchParams;
  const requested = typeof params?.category === "string" ? params.category : "";
  const category =
    CATEGORIES.find((c) => c.toLowerCase() === requested.toLowerCase()) ?? "All";

  return (
    <>
      <PageHero
        crumb="Gear"
        eyebrow="Season 01 catalog"
        lines={[{ text: "All the" }, { text: "Gear", outline: true }]}
        description="Helmets, jackets, gloves and boots. Every piece crash-tested, every piece built to be ridden hard."
        image={{
          src: "/images/heroes/gear.jpg",
          alt: "Full VOLTEX riding kit (helmet, jacket, gloves and boots) floating in an exploded view",
        }}
      />
      {/* key remounts the catalog when a footer link changes the category */}
      <GearCatalog key={category} initialCategory={category} />
    </>
  );
}