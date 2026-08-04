import React from "react";

/** Small rounded status/priority badge, e.g. "High", "Resolved". */
export default function Pill({ color, bg, children }) {
  return (
    <span className="pill" style={{ color, background: bg }}>
      {children}
    </span>
  );
}
