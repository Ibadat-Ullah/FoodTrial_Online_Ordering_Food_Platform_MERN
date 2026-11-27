import { apiError } from "../service/api";
import { userModel } from "../models/userModel";

const handle = (action) => async (...args) => {
  try {
    return await action(...args);
  } catch (error) {
    throw new Error(apiError(error), { cause: error });
  }
};

export const userController = {
  list: handle(userModel.list),
};
