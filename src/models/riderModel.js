import api from "../service/api";

export const riderModel = {
  list: () => api.get("/riders").then(({ data }) => data),
  create: (values) => api.post("/riders", values).then(({ data }) => data),
  update: (id, values) =>
    api.patch(`/riders/${id}`, values).then(({ data }) => data),
  remove: (id) => api.delete(`/riders/${id}`).then(({ data }) => data),
};
