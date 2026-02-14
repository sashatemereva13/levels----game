import { createContext, useContext, useEffect, useState } from "react";
import * as authAPI from "../api/authAPI";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authAPI.me().then((data) => {
      setUser(data?.id ? data : null);
      setLoading(false);
    });
  }, []);

  const login = async (u, p) => {
    const data = await authAPI.login(u, p);
    setUser(data);
  };

  const register = async (u, p, role) => {
    const data = await authAPI.register(u, p, role);
    setUser(data);
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
