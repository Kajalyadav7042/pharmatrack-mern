import axiosInstance from "./axios";

export const loginUser = async (data) => {
  const response = await axiosInstance.post(
    "/auth/login",
    data
  );

  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get(
    "/auth/profile"
  );

  return response.data;
};