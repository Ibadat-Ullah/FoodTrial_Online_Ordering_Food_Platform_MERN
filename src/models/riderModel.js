import api from "../service/api";

const toFormData = (values) => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (key === "profileImage") {
      if (value?.length) formData.append(key, value[0]);
    } else if (value !== "" && value != null) {
      formData.append(key, value);
    }
  });
  return formData;
};

export const riderModel = {
  list: () => api.get("/riders").then(({ data }) => data),
  create: (values) => api.post("/riders", toFormData(values)).then(({ data }) => data),
  update: (id, values) =>
    api.patch(`/riders/${id}`, toFormData(values)).then(({ data }) => data),
  remove: (id) => api.delete(`/riders/${id}`).then(({ data }) => data),
};
