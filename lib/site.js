// Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically on deploy
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const SITE_NAME = "VOLTEX Moto Co.";
export const SITE_DESCRIPTION =
  "Armored riding gear built for the street, the canyon and the track. Season 01 now shipping.";