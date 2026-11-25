import { useEffect, useState } from "react";
import { authController } from "../controllers/authController";
import AuthContext from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authController.getUser);

  useEffect(() => {
    const logout = () => setUser(null);
    window.addEventListener("foodtrial:logout", logout);
    return () => window.removeEventListener("foodtrial:logout", logout);
  }, []);

  const signIn = async (values) => {
    const session = await authController.login(values);
    setUser(session.user);
  };
  const signUp = async (values) => {
    const session = await authController.register(values);
    setUser(session.user);
  };
  const signOut = () => {
    authController.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
