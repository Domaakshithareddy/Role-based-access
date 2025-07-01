"use client";
import { createContext, useState, useEffect, useCallback } from "react";
import { verifyToken, logout as apiLogout } from "../lib/auth";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await verifyToken();
      setUser(data.user);
    } catch {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    syncUser();             
  }, [syncUser]);

  const handleLogout = async () => {
    await apiLogout();
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, syncUser, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
