import { useEffect } from "react";

/**
 * JS-side color/font constants.
 * Structural styling lives in index.css (as CSS variables) — these are only
 * used where JS needs a real color string: recharts fills, and per-row
 * dynamic colors (category/status/priority) that come from data, not layout.
 */
export const C = {
  navy: "#182235",
  navyDeep: "#0f1620",
  navyLight: "#26334d",
  navyLine: "#2e3c58",
  gold: "#d89d2a",
  goldDeep: "#b8841f",
  goldLight: "#f0c675",
  goldTint: "#fbead0",
  cream: "#f4efe3",
  card: "#fffcf5",
  border: "#e5dcc4",
  borderStrong: "#d8cba7",
  ink: "#211d15",
  slate: "#726b58",
  slateLight: "#948c76",
  success: "#3c7a52",
  successBg: "#e4f0e5",
  danger: "#b64632",
  dangerBg: "#fae5df",
  warn: "#b8841f",
  warnBg: "#faf1de",
  info: "#3d5a80",
  infoBg: "#e6ecf3",
};

export const F = {
  display: "'Zilla Slab', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

const FONT_LINK_ID = "ccmp-fonts";

/** Injects the Google Fonts <link> once, on first mount. */
export function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_LINK_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap";
    document.head.appendChild(link);
  }, []);
}
