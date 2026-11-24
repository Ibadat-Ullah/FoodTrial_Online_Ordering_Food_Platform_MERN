import api from "../service/api";

export const foodModel = {
  list: () => api.get("/foods").then(({ data }) => data),
  create: (values) => api.post("/foods", values).then(({ data }) => data),
  update: (id, values) =>
    api.patch(`/foods/${id}`, values).then(({ data }) => data),
  remove: (id) => api.delete(`/foods/${id}`).then(({ data }) => data),
};
