import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_ADMIN } from "../data/adminData";

/**
 * Temporary / mock authentication.
 * ---------------------------------------------------------------------
 * There is no backend yet, so this context simulates a login API with a
 * fixed local "account" and a short artificial delay. It is intentionally
 * isolated behind the same login()/logout() interface a real API call
 * would use, so swapping in a real backend later only means editing the
 * body of `login()` below (e.g. replacing it with a fetch/axios call that
 * returns a token) — nothing else in the app needs to change.
 *
 * Session persistence:
 *  - "Remember me" checked  -> saved to localStorage (survives browser close)
 *  - "Remember me" unchecked -> saved to sessionStorage (cleared on tab close)
 */

const STORAGE_KEY = "ccmp_admin_session";

// Mock credentials for local development only — replace with a real API call.
const MOCK_CREDENTIALS = {
  email: "admin.jay@college.edu",
  password: "admin123",
};

const AuthContext = createContext(null);

function readStoredSession() {
  try {
    const fromLocal = localStorage.getItem(STORAGE_KEY);
    if (fromLocal) return JSON.parse(fromLocal);
    const fromSession = sessionStorage.getItem(STORAGE_KEY);
    if (fromSession) return JSON.parse(fromSession);
  } catch {
    // Corrupt/blocked storage — treat as logged out.
  }
  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Restore session on first load (page refresh, new tab, etc).
  useEffect(() => {
    const stored = readStoredSession();
    if (stored) setUser(stored);
    setInitializing(false);
  }, []);

  const login = async ({ email, password, rememberMe }) => {
    // Simulated network latency so the loading state is visible/testable.
    await new Promise((resolve) => setTimeout(resolve, 700));

    const normalizedEmail = email.trim().toLowerCase();
    const isValid =
      normalizedEmail === MOCK_CREDENTIALS.email.toLowerCase() &&
      password === MOCK_CREDENTIALS.password;

    if (!isValid) {
      throw new Error("Invalid email or password.");
    }

    const session = { email: normalizedEmail, name: DEFAULT_ADMIN.name, role: DEFAULT_ADMIN.role };
    setUser(session);

    const payload = JSON.stringify(session);
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY, payload);
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, payload);
      localStorage.removeItem(STORAGE_KEY);
    }

    return session;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      initializing,
      login,
      logout,
    }),
    [user, initializing]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
