import { useEffect, useState } from "react";
import { authController } from "../controllers/authController";
import AuthContext from "./authContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authController.getUser);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const logout = () => {
      setUser(null);
      setNotification({
        message: "Your session ended. Please sign in again.",
        type: "info",
      });
    };
    window.addEventListener("foodtrial:logout", logout);
    return () => window.removeEventListener("foodtrial:logout", logout);
  }, []);

  useEffect(() => {
    if (!notification) return undefined;
    const timeoutId = window.setTimeout(() => setNotification(null), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);

  const notify = (message, type = "info") => setNotification({ message, type });

  const signIn = async (values) => {
    const session = await authController.login(values);
    setUser(session.user);
    setNotification({
      message: `${session.user.role === "admin" ? "Admin" : "User"} logged in successfully.`,
      type: "success",
    });
    return session;
  };
  const signUp = async (values) => {
    const session = await authController.register(values);
    setUser(session.user);
    setNotification({
      message: `Account created. You are logged in as ${session.user.role}.`,
      type: "success",
    });
    return session;
  };
  const signOut = () => {
    authController.logout();
    setUser(null);
    setNotification({ message: "You have been logged out.", type: "info" });
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, notify }}>
      {children}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed left-1/2 top-4 z-[100] -translate-x-1/2 rounded-lg px-5 py-3 text-sm font-medium text-white shadow-lg ${
            notification.type === "success" ? "bg-green-700" : "bg-gray-800"
          }`}
        >
          {notification.message}
        </div>
      )}
    </AuthContext.Provider>
  );
}
