import axiosInstance from "./axios";

export const getMedicines = async (params = {}) => {
  const response = await axiosInstance.get("/medicines", {
    params,
  });

  return response.data;
};

export const addMedicine = async (data) => {
  const response = await axiosInstance.post(
    "/medicines",
    data
  );

  return response.data;
};

export const deleteMedicine = async (id) => {
  const response = await axiosInstance.delete(
    `/medicines/${id}`
  );

  return response.data;
};

export const getMedicineById = async (id) => {
  const response = await axiosInstance.get(
    `/medicines/${id}`
  );

  return response.data;
};

export const updateMedicine = async (id, data) => {
  const response = await axiosInstance.put(
    `/medicines/${id}`,
    data
  );

  return response.data;
};