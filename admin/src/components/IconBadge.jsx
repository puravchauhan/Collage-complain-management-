import React from "react";

/** Rounded-square icon chip, used for category icons and stat card icons. */
export default function IconBadge({ icon: Icon, color, bg, size = 34 }) {
  return (
    <div className="icon-badge" style={{ width: size, height: size, background: bg }}>
      <Icon size={size * 0.5} color={color} strokeWidth={2.2} />
    </div>
  );
}
