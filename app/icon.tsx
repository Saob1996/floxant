import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 96,
  height: 96,
};

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
          background:
            "linear-gradient(135deg, #0b0d12 0%, #111827 55%, #172554 100%)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 30px rgba(0,0,0,0.35)",
          color: "#ffffff",
          fontSize: 52,
          fontWeight: 800,
          fontFamily: "Inter, sans-serif",
          letterSpacing: "-0.05em",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "24px",
            background:
              "radial-gradient(circle at top, rgba(96,165,250,0.22), transparent 45%)",
          }}
        />

        <span
          style={{
            lineHeight: 1,
            transform: "translateY(-1px)",
            position: "relative",
            zIndex: 1,
          }}
        >
          F
        </span>

        <div
          style={{
            position: "absolute",
            bottom: 11,
            right: 11,
            width: 9,
            height: 9,
            borderRadius: "9999px",
            background: "#60a5fa",
            boxShadow: "0 0 12px rgba(96,165,250,0.7)",
            zIndex: 1,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}