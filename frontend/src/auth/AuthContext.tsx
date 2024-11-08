import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: string | null;
  token: string | null;
  login: (token: string, user: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialize state directly from localStorage
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Remove the useEffect since we are initializing state directly

  const login = (newToken: string, newUser: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", newUser);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
