import React from "react";
import { useNavigate } from "react-router-dom";
import { COLORS, FONTS, RegMark } from "./theme";

const PRODUCTS = [
  { id: "book", label: "Books / Booklet", desc: "Multi-page jobs with cover and inner sheets", accent: COLORS.pixelpress },
  { id: "flyer", label: "Flyer", desc: "Single-sheet, high-volume print runs", accent: COLORS.pixelpress },
  { id: "card", label: "Complementary Card", desc: "Small-format business or greeting cards", accent: COLORS.pixelpress },
  { id: "receipt", label: "Receipt Booklet", desc: "Sequentially numbered pad-bound booklets", accent: COLORS.pixelpress },
   { id: "brochure", label: "Brochures", desc: "Foldable paper with printed information", accent: COLORS.pixelpress },
{ id: "calendar", label: "Calendars", desc: " Calendars to read dates", accent: COLORS.pixelpress },

  ];
   
function ProductCard({ product, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        background: COLORS.sheet,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 8,
        padding: "10px 20px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        transition: "border-color 0.15s, transform 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = product.accent;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = COLORS.line;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: product.accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RegMark color={COLORS.sheet} size={18} />
      </div>
      <div
        style={{
          fontFamily: FONTS.heading,
          fontWeight: 700,
          fontSize: 17,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
          color: COLORS.ink,
        }}
      >
        {product.label}
      </div>
      <div style={{ fontFamily: FONTS.body, fontSize: 12.5, color: COLORS.slate, lineHeight: 1.4 }}>
        {product.desc}
      </div>
    </button>
  );
}

export default function ProductSelector() {
  const navigate = useNavigate();

  return (
    <div style={{ background: COLORS.paper, minHeight: "100vh", padding: "48px 24px", boxSizing: "border-box" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <RegMark color={COLORS.ink} size={22} />
          <h1
            style={{
              margin: 0,
              fontFamily: FONTS.heading,
              fontWeight: 700,
              fontSize: 34,
              letterSpacing: "0.02em",
              color: COLORS.pixelpress,
            }}
          >
            PixelPress
          </h1>
        </div>
        <p style={{ margin: "0 0 36px 32px", fontFamily: FONTS.body, fontSize: 14, color: COLORS.slate }}>
          What are you costing today?
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
          }}
        >
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => navigate(`/ticket/${p.id}`)} />
          ))}
        </div>
      </div>
    </div>
  );
}
