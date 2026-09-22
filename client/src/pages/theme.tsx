
export const COLORS = {
  paper: "#F7F4EC",
  sheet: "#FFFFFF",
  ink: "#1C1B18",
  slate: "#8A8374",
  line: "#E0DACB",
  cyan: "#0093C9",
  magenta: "#D31670",
  yellow: "#C99400",
  danger: "#B4432E",
  pixelpress: "#166534",
};

export const FONTS = {
  heading: "'Barlow Condensed', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

export const RegMark = ({ color = COLORS.ink, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ flexShrink: 0 }}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="6.5" stroke={color} strokeWidth="1.4" />
    <line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="1.4" />
    <line x1="1" y1="12" x2="23" y2="12" stroke={color} strokeWidth="1.4" />
  </svg>
);
