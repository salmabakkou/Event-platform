import { api } from "./axiosConfig";

export const placeOrder = async (orderData) => {
  return await api.post("/orders", orderData);
};
