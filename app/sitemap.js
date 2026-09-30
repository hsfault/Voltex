import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  return ["", "/gear", "/crew", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}