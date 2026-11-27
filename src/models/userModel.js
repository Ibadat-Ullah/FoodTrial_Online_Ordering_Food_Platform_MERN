import api from "../service/api";

export const userModel = {
  list: () => api.get("/users").then(({ data }) => data),
};
