import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";
import { tokens } from "../api/client";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tokens.access) { setLoading(false); return; }
    authApi.fetchMe().then(setUser).catch(() => tokens.clear()).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    tokens.set(await authApi.login(email, password));
    const me = await authApi.fetchMe();
    setUser(me);
    return me;
  };

  const logout = () => { tokens.clear(); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
