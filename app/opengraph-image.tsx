import { ImageResponse } from "next/og";

export const alt = "FLOXANT - Umzug, Reinigung, Entrümpelung, Büroumzug und Leer-Rückfahrt in Regensburg und Bayern";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: "white",
          background:
            "radial-gradient(circle at 72% 10%, rgba(96,165,250,0.34), transparent 34%), linear-gradient(135deg, #05070d 0%, #0b1020 52%, #101827 100%)",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(145deg, #1d4ed8, #60a5fa)",
                fontSize: 36,
                fontWeight: 900,
                boxShadow: "0 18px 60px rgba(37,99,235,0.35)",
              }}
            >
              F
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: 3 }}>FLOXANT</div>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.52)", letterSpacing: 4 }}>
                PREMIUM SERVICES
              </div>
            </div>
          </div>
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 999,
              padding: "14px 22px",
              color: "#bfdbfe",
              fontSize: 18,
              fontWeight: 700,
              background: "rgba(255,255,255,0.045)",
            }}
          >
            Regensburg + Bayern
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative", maxWidth: 900 }}>
          <div
            style={{
              display: "flex",
              gap: 14,
              color: "#93c5fd",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 26,
            }}
          >
            Umzug · Reinigung · Entrümpelung · Büroumzug
          </div>
          <div style={{ fontSize: 78, fontWeight: 900, lineHeight: 0.98, letterSpacing: -3 }}>
            Klare Vorprüfung. Starke Umsetzung.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, lineHeight: 1.35, color: "rgba(255,255,255,0.64)" }}>
            Regensburg und Bayern: Preisrahmen, Zusatzservices, Leer-Rückfahrt und direkte Anfrage.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, position: "relative" }}>
          {["Rechner", "Preisvorstellung", "Leer-Rückfahrt", "Private Client"].map((label) => (
            <div
              key={label}
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 18,
                padding: "14px 18px",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.76)",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
