import { authModel } from "../models/authModel";
import { sessionKey } from "../service/api";

const saveSession = (session) => {
  localStorage.setItem(sessionKey, JSON.stringify(session));
  return session;
};

const getSession = () =>
  JSON.parse(localStorage.getItem(sessionKey) || "null");

export const authController = {
  login: async (values) => saveSession(await authModel.login(values)),
  register: async (values) => saveSession(await authModel.register(values)),
  getUser: () => getSession()?.user || null,
  logout: () => localStorage.removeItem(sessionKey),
};
