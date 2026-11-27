import { apiError } from "../service/api";
import { orderModel } from "../models/orderModel";

const handle = (action) => async (...args) => {
  try {
    return await action(...args);
  } catch (error) {
    throw new Error(apiError(error), { cause: error });
  }
};

export const orderController = {
  create: handle(orderModel.create),
  listMine: handle(orderModel.listMine),
  listAll: handle(orderModel.listAll),
  updateStatus: handle(orderModel.updateStatus),
};
