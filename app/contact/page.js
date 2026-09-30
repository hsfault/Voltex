import PageHero from "@/components/PageHero";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import { TOPICS } from "@/data/contact";

export const metadata = {
  title: "Contact",
  description:
    "Questions about orders, sizing or joining the crew? Talk to the VOLTEX pit crew. We reply within 24 hours.",
};

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const requested = typeof params?.topic === "string" ? params.topic.toLowerCase() : "";
  const topic = TOPICS.some((t) => t.id === requested) ? requested : "other";

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact"
        lines={[{ text: "Talk to the" }, { text: "Pit Crew", outline: true }]}
        description="Orders, sizing, crew applications or just a question about a road. Real riders answer every message."
      />
      <ContactSection key={topic} initialTopic={topic} />
      <FaqSection />
    </>
  );
}