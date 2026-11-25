import api from "../service/api";

export const authModel = {
  login: (values) => api.post("/auth/login", values).then(({ data }) => data),
  register: (values) => api.post("/auth/register", values).then(({ data }) => data),
};
