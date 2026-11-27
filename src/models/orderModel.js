import api from "../service/api";

export const orderModel = {
  create: (order) => api.post("/orders", order).then(({ data }) => data),
  listMine: () => api.get("/orders/mine").then(({ data }) => data),
  listAll: () => api.get("/orders").then(({ data }) => data),
  updateStatus: (id, status) =>
    api.patch(`/orders/${id}/status`, { status }).then(({ data }) => data),
};
