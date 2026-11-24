import { apiError } from "../service/api";

const handle = (action) => async (...args) => {
  try {
    return await action(...args);
  } catch (error) {
    throw new Error(apiError(error), { cause: error });
  }
};

export const createResourceController = (model) => ({
  list: handle(model.list),
  create: handle(model.create),
  update: handle(model.update),
  remove: handle(model.remove),
});
