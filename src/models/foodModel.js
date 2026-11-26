import api from "../service/api";

const toFormData = (values) => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (key === "image") {
      if (value?.length) formData.append("image", value[0]);
    } else if (value !== "" && value != null) {
      formData.append(key, value);
    }
  });
  return formData;
};

export const foodModel = {
  list: () => api.get("/foods").then(({ data }) => data),
  create: (values) =>
    api.post("/foods", toFormData(values)).then(({ data }) => data),
  update: (id, values) =>
    api.patch(`/foods/${id}`, toFormData(values)).then(({ data }) => data),
  remove: (id) => api.delete(`/foods/${id}`).then(({ data }) => data),
};
