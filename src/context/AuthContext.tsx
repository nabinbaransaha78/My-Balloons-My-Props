import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAdmin: boolean;
  loginAsAdmin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("isAdmin");
    if (stored === "true") setIsAdmin(true);
  }, []);

  const loginAsAdmin = () => {
    setIsAdmin(true);
    localStorage.setItem("isAdmin", "true");
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
