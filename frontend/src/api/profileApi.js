import axiosInstance from "./axios";

export const getProfile = async () => {
  const response = await axiosInstance.get(
    "/auth/profile"
  );

  return response.data;
};