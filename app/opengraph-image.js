import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "VOLTEX Moto Co. — Armored riding gear, Season 01";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont() {
  try {
    return await readFile(
      join(process.cwd(), "assets/fonts/BarlowCondensed-BlackItalic.ttf")
    );
  } catch {
    return null; // falls back to the default font if the file is missing
  }
}

export default async function OpengraphImage() {
  const font = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          backgroundColor: "#05070d",
          backgroundImage:
            "radial-gradient(circle at 78% 40%, rgba(30,79,224,0.95) 0%, rgba(15,44,150,0.55) 32%, rgba(5,7,13,1) 70%)",
          color: "#eef2f7",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7ab0ff",
          }}
        >
          <span>Moto Co.</span>
          <span>Season 01 — Now shipping</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 240,
              lineHeight: 0.85,
              letterSpacing: -4,
              fontFamily: font ? "Barlow" : "sans-serif",
              fontStyle: "italic",
              fontWeight: 900,
              textTransform: "uppercase",
            }}
          >
            Voltex
          </div>
          <div style={{ marginTop: 20, fontSize: 34, color: "rgba(238,242,247,0.8)" }}>
            Armored riding gear for the street, the canyon and the track.
          </div>
        </div>

        {/* LED strips, echoing the splash */}
        <div style={{ display: "flex", gap: 14 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 64,
                height: 12,
                background: "#2f86ff",
                transform: "skewX(-12deg)",
                boxShadow: "0 0 18px 4px rgba(47,134,255,0.8)",
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Barlow", data: font, style: "italic", weight: 900 }]
        : [],
    }
  );
}