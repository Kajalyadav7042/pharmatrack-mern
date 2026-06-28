import axiosInstance from "./axios";

export const createSale = async (data) => {
  const response = await axiosInstance.post(
    "/sales",
    data
  );

  return response.data;
};

export const getSales = async () => {
  const response = await axiosInstance.get(
    "/sales"
  );

  return response.data;
};