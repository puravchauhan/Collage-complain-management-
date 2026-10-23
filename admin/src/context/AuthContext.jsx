
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "ccmp_admin_session";
const API_URL = "https://localhost:7277/api/AdminManagement/login";

const AuthContext = createContext(null);

function readStoredSession() {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) return JSON.parse(local);

    const session = sessionStorage.getItem(STORAGE_KEY);
    if (session) return JSON.parse(session);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  return null;
}

function saveSession(session) {
  const local = localStorage.getItem(STORAGE_KEY);
  const storedSession = sessionStorage.getItem(STORAGE_KEY);

  if (local !== null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else if (storedSession !== null) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    setUser(readStoredSession());
    setInitializing(false);
  }, []);

  const login = async ({ email, password, rememberMe }) => {
    let response;

    try {
      response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });
    } catch {
      throw new Error(
        "Cannot connect to the backend. Make sure your .NET API is running."
      );
    }

    // Read the response safely to avoid Unexpected end of JSON input.
    const responseText = await response.text();
    let data = {};

    if (responseText.trim()) {
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `The server returned invalid JSON. HTTP ${response.status}.`
        );
      }
    }

    if (!response.ok || data.success !== true) {
      throw new Error(
        data.message ||
          data.title ||
          `Login failed. HTTP status ${response.status}.`
      );
    }

    if (!data.user) {
      throw new Error("Admin details were not returned by the server.");
    }

    const id = data.user.id ?? data.user.Id;

    if (id == null) {
      throw new Error("Admin ID was not returned by the backend.");
    }

    const session = {
      id,
      name: data.user.name ?? data.user.Name ?? "",
      email: data.user.email ?? data.user.Email ?? "",
      role: data.user.role ?? data.user.Role ?? "Admin",
    };

    setUser(session);

    const savedSession = JSON.stringify(session);

    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY, savedSession);
      sessionStorage.removeItem(STORAGE_KEY);
    } else {
      sessionStorage.setItem(STORAGE_KEY, savedSession);
      localStorage.removeItem(STORAGE_KEY);
    }

    return session;
  };

  const updateUser = (updatedUser) => {
    setUser((currentUser) => {
      if (!currentUser) return currentUser;

      const updated = {
        ...currentUser,
        ...updatedUser,
      };

      saveSession(updated);
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      initializing,
      login,
      logout,
      updateUser,
    }),
    [user, initializing]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
