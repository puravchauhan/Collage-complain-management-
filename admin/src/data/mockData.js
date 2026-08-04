import {
  Zap, Wifi, Droplet, Armchair, MonitorSmartphone, HelpCircle,
} from "lucide-react";
import { C } from "../theme/tokens";

export const CATEGORY_META = {
  Electrical: { icon: Zap, color: C.gold, bg: C.goldTint },
  "Wi-Fi / Network": { icon: Wifi, color: C.info, bg: C.infoBg },
  "Water Leakage": { icon: Droplet, color: "#2f6690", bg: "#e2edf3" },
  Furniture: { icon: Armchair, color: C.slate, bg: "#efe9db" },
  Equipment: { icon: MonitorSmartphone, color: C.danger, bg: C.dangerBg },
  Other: { icon: HelpCircle, color: C.slate, bg: "#efe9db" },
};

export const STATUS_META = {
  Pending: { color: C.warn, bg: C.warnBg },
  Assigned: { color: C.info, bg: C.infoBg },
  "In Progress": { color: C.goldDeep, bg: C.goldTint },
  Resolved: { color: C.success, bg: C.successBg },
};

export const PRIORITY_META = {
  High: { color: C.danger, bg: C.dangerBg },
  Medium: { color: C.goldDeep, bg: C.goldTint },
  Low: { color: C.slate, bg: "#efe9db" },
};

export const STATUS_ORDER = ["Pending", "Assigned", "In Progress", "Resolved"];

export const TECHNICIANS = [
  { id: "T-01", name: "Ramesh Patil", specialty: "Electrical", active: 3, rating: 4.8 },
  { id: "T-02", name: "Sunita More", specialty: "Networking", active: 2, rating: 4.9 },
  { id: "T-03", name: "Vikas Chauhan", specialty: "Plumbing", active: 4, rating: 4.5 },
  { id: "T-04", name: "Anjali Deshmukh", specialty: "Carpentry", active: 1, rating: 4.7 },
  { id: "T-05", name: "Feroz Sheikh", specialty: "Electronics", active: 2, rating: 4.6 },
];

export const INITIAL_COMPLAINTS = [
  { id: "CMP-1042", title: "Ceiling fan not working", category: "Electrical", location: "Block A - Room 214", student: "Priya Nair", priority: "High", status: "Pending", technician: null, date: "2026-07-28", desc: "Fan makes a grinding noise then stops. Needs inspection before it falls." },
  { id: "CMP-1041", title: "Wi-Fi drops every evening", category: "Wi-Fi / Network", location: "Hostel Block C", student: "Arjun Mehta", priority: "Medium", status: "Assigned", technician: "T-02", date: "2026-07-27", desc: "Connection drops between 7-9 PM daily, affecting online classes." },
  { id: "CMP-1040", title: "Leaking pipe under sink", category: "Water Leakage", location: "Girls Hostel - Wing 2", student: "Sneha Kulkarni", priority: "High", status: "In Progress", technician: "T-03", date: "2026-07-26", desc: "Water pooling on the floor, slipping hazard reported by two students." },
  { id: "CMP-1039", title: "Broken chair leg", category: "Furniture", location: "Library - 2nd Floor", student: "Rohit Sharma", priority: "Low", status: "Resolved", technician: "T-04", date: "2026-07-22", desc: "One leg cracked, chair wobbles when seated." },
  { id: "CMP-1038", title: "Projector not turning on", category: "Equipment", location: "Block B - Seminar Hall", student: "Kavya Iyer", priority: "High", status: "In Progress", technician: "T-05", date: "2026-07-25", desc: "No display output, power light blinks red." },
  { id: "CMP-1037", title: "Tube light flickering", category: "Electrical", location: "Block A - Room 108", student: "Devansh Rao", priority: "Medium", status: "Pending", technician: null, date: "2026-07-28", desc: "Constant flicker, distracting during lectures." },
  { id: "CMP-1036", title: "Router unreachable in lab", category: "Wi-Fi / Network", location: "Computer Lab - 3rd Floor", student: "Meera Joshi", priority: "Medium", status: "Assigned", technician: "T-02", date: "2026-07-24", desc: "No signal reaches the last two rows of systems." },
  { id: "CMP-1035", title: "Washbasin tap broken", category: "Water Leakage", location: "Block C - Washroom", student: "Aditya Verma", priority: "Low", status: "Resolved", technician: "T-03", date: "2026-07-20", desc: "Tap handle snapped off, water running continuously." },
  { id: "CMP-1034", title: "Desk drawer jammed", category: "Furniture", location: "Faculty Room - Block A", student: "Ishaan Gupta", priority: "Low", status: "Pending", technician: null, date: "2026-07-29", desc: "Drawer stuck shut, can't be pried open." },
  { id: "CMP-1033", title: "AC not cooling", category: "Equipment", location: "Block B - Room 301", student: "Tanvi Desai", priority: "Medium", status: "Resolved", technician: "T-05", date: "2026-07-18", desc: "Compressor runs but no cold air output." },
  { id: "CMP-1032", title: "Short circuit near switchboard", category: "Electrical", location: "Block C - Corridor", student: "Karan Malhotra", priority: "High", status: "In Progress", technician: "T-01", date: "2026-07-27", desc: "Sparking noticed near the main switchboard, urgent safety concern." },
  { id: "CMP-1031", title: "Cracked window pane", category: "Other", location: "Hostel Block A - Room 12", student: "Naina Kapoor", priority: "Low", status: "Assigned", technician: "T-04", date: "2026-07-23", desc: "Small crack, growing slowly, needs replacement before monsoon." },
];
