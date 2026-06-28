import axiosInstance from "./axios";

export const createPurchaseOrder = async (data) => {
  const response = await axiosInstance.post(
    "/orders",
    data
  );

  return response.data;
};

export const getPurchaseOrders = async () => {
  const response = await axiosInstance.get(
    "/orders"
  );

  return response.data;
};

export const updateOrderStatus = async (
  id,
  status
) => {
  const response = await axiosInstance.put(
    `/orders/${id}/status`,
    { status }
  );

  return response.data;
};