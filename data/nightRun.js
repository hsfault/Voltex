export const CHAPTERS = [
  {
    id: "city",
    number: "01",
    title: "City",
    time: "22:40",
    copy:
      "Wet paint, tram rails, stop-start traffic. Short hops still deserve real armor, and enough airflow to survive the red lights.",
    conditions: ["Stop-start", "Wet tarmac", "Low speed"],
    gearId: "ionic-mesh",
    image: "/images/night-run/city.jpg",
    fallback: "bg-[radial-gradient(ellipse_at_70%_30%,#1e4fe0_0%,#07123a_60%)]",
  },
  {
    id: "canyon",
    number: "02",
    title: "Canyon",
    time: "00:15",
    copy:
      "The city lights drop away and the road starts to twist. Focus, visibility and a helmet that stays quiet at speed.",
    conditions: ["Twisties", "Cold air", "Mid speed"],
    gearId: "surge-carbon",
    image: "/images/night-run/canyon.jpg",
    fallback: "bg-[radial-gradient(ellipse_at_30%_70%,#0f2c96_0%,#05070d_65%)]",
  },
  {
    id: "track",
    number: "03",
    title: "Track",
    time: "01:30",
    copy:
      "Closed circuit, warm tyres, full lean. This is where every piece of armor finally earns its place.",
    conditions: ["Full lean", "Hot tyres", "Top speed"],
    gearId: "torque-race",
    image: "/images/night-run/track.jpg",
    fallback: "bg-[linear-gradient(135deg,#07123a_0%,#1e4fe0_50%,#05070d_100%)]",
  },
];