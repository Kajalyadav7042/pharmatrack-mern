import axiosInstance from "./axios";

export const getDashboardData = async () => {
  const response = await axiosInstance.get("/dashboard");

  return response.data;
};



export const getDashboardStats = async () => {
  const response = await axiosInstance.get(
    "/dashboard/stats"
  );

  return response.data;
};