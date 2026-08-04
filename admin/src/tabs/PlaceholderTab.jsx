import React from "react";

/** Generic empty-state card, reused for Students / Reports / Settings tabs. */
export default function PlaceholderTab({ label, note }) {
  return (
    <div className="placeholder-card">
      <div className="placeholder-title">{label}</div>
      <div className="placeholder-note">{note}</div>
    </div>
  );
}
