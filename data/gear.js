export const CATEGORIES = ["All", "Helmets", "Jackets", "Gloves", "Boots"];

export const formatPrice = (n) => `$${n.toLocaleString("en-US")}`;

export const GEAR = [
  {
    id: "surge-carbon",
    name: "Surge Carbon",
    category: "Helmets",
    price: 389,
    tag: "New",
    image: "/images/gear/surge-carbon.png",
    description:
      "Full-face carbon composite shell with a wind-tunnel tuned rear spoiler and a quick-release visor you can swap at a fuel stop.",
    specs: ["Carbon composite shell", "Triple-density EPS liner", "Pinlock-ready visor"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "nightline-modular",
    name: "Nightline Modular",
    category: "Helmets",
    price: 329,
    tag: null,
    image: "/images/gear/nightline-modular.png",
    description:
      "Flip-front touring lid with an internal smoke sun visor and a quiet, low-turbulence chin bar for long night runs.",
    specs: ["Flip-up chin bar", "Drop-down sun visor", "Intercom-ready cutouts"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "arc-shell",
    name: "Arc Shell",
    category: "Jackets",
    price: 279,
    tag: "Best seller",
    image: "/images/gear/arc-shell.png",
    description:
      "Three-layer textile jacket with a removable thermal liner, waterproof membrane and armor at the shoulders, elbows and back.",
    specs: ["CE Level 2 armor", "Waterproof membrane", "Removable thermal liner"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "ionic-mesh",
    name: "Ionic Mesh",
    category: "Jackets",
    price: 219,
    tag: null,
    image: "/images/gear/ionic-mesh.png",
    description:
      "Summer mesh jacket that keeps air moving at city speed, with abrasion panels where you land first.",
    specs: ["High-flow mesh panels", "Abrasion-zone overlays", "Reflective piping"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "grip-7",
    name: "Grip-7 Race",
    category: "Gloves",
    price: 89,
    tag: "New",
    image: "/images/gear/grip-7.png",
    description:
      "Long-cuff race gauntlet with hard knuckle protection, palm sliders and a pre-curved fit for full grip.",
    specs: ["Hard knuckle guard", "Palm sliders", "Touchscreen fingertip"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "static-short",
    name: "Static Short",
    category: "Gloves",
    price: 59,
    tag: null,
    image: "/images/gear/static-short.png",
    description:
      "Short-cuff urban glove that slips on in seconds, with soft knuckle padding and a grippy palm.",
    specs: ["Soft knuckle padding", "Reinforced palm", "Velcro wrist closure"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "torque-race",
    name: "Torque Race",
    category: "Boots",
    price: 249,
    tag: null,
    image: "/images/gear/torque-race.png",
    description:
      "Tall race boot with ankle bracing, replaceable toe sliders and a stiff sole for precise footpeg feel.",
    specs: ["Ankle bracing system", "Replaceable toe sliders", "Oil-resistant sole"],
    sizes: ["40", "41", "42", "43", "44", "45"],
  },
  {
    id: "pulse-urban",
    name: "Pulse Urban",
    category: "Boots",
    price: 179,
    tag: "Best seller",
    image: "/images/gear/pulse-urban.png",
    description:
      "Sneaker-style riding shoe with hidden ankle cups and a shifter pad, so you can ride in and walk around all day.",
    specs: ["Hidden ankle cups", "Shifter pad", "Waterproof lining"],
    sizes: ["40", "41", "42", "43", "44", "45"],
  },
];