import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const KEY = "campusTechnicianAccount";

export default function App() {
  const [page, setPage] = useState("register");
  const [technician, setTechnician] = useState(null);

  function register(account) {
    localStorage.setItem(KEY, JSON.stringify(account)); // Demo-only browser storage
    setPage("login");
  }

  if (technician) return <Dashboard technician={technician} onLogout={() => { setTechnician(null); setPage("login"); }} />;
  if (page === "register") return <Register onRegister={register} onShowLogin={() => setPage("login")} />;
  return <Login onLogin={setTechnician} onShowRegister={() => setPage("register")} />;
}
