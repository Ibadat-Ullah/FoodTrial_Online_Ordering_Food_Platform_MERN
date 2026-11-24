import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

const resourceApi = (resource) => ({
  list: () => api.get(`/${resource}`).then(({ data }) => data),
  create: (values) => api.post(`/${resource}`, values).then(({ data }) => data),
  update: (id, values) => api.patch(`/${resource}/${id}`, values).then(({ data }) => data),
  remove: (id) => api.delete(`/${resource}/${id}`).then(({ data }) => data),
});

export const foodsApi = resourceApi("foods");
export const ridersApi = resourceApi("riders");
export const apiError = (error) =>
  error.response?.data?.message || "Could not connect to the server.";
