import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

const sessionKey = "foodtrial-session";

api.interceptors.request.use((config) => {
  const session = JSON.parse(localStorage.getItem(sessionKey) || "null");
  if (session?.token) config.headers.Authorization = `Bearer ${session.token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = /\/auth\/(login|register)$/.test(error.config?.url || "");
    if (error.response?.status === 401 && !isAuthRequest) {
      if (localStorage.getItem(sessionKey)) {
        localStorage.removeItem(sessionKey);
        window.dispatchEvent(new Event("foodtrial:logout"));
      }
    }
    return Promise.reject(error);
  },
);

export const apiError = (error) =>
  error.response?.data?.message || "Could not connect to the server.";

export { sessionKey };
export default api;
