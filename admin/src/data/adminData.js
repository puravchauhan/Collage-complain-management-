/** Default admin account + portal settings. Lifted into App state so edits
 * made in Profile or Settings are visible everywhere (sidebar, topbar, overview). */
export const DEFAULT_ADMIN = {
  name: "Jay Kaneriya",
  role: "Admin",
  department: "Campus Facilities & Maintenance",
  email: "admin.jay@college.edu",
  phone: "+91 95101 64514",
};

export const DEFAULT_SETTINGS = {
  emailNotifications: true,
  autoAssignSuggestions: true,
  compactDocketView: false,
  defaultLandingTab: "overview",
};

/** "Admin Desai" -> "AD" */
export function initialsOf(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
