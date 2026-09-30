import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07123a",
          borderRadius: 12,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 32 32">
          <path d="M2 5h7.5l6.5 15 6.5-15H30L19.5 27h-7z" fill="#2f86ff" />
        </svg>
      </div>
    ),
    size
  );
}