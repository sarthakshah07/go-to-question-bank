
import { axiosInstance, isAxiosError } from "@/app/services/api.services";

const url = "/api/categories";
export const getCategoriesAsync = async () => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
};

export const addCategoriesAsync = async (request) => {
  try {
    const response = await axiosInstance.post(url, {...request, action: "add"});
    return response;
  } catch (error) {
    console.log("error", error);
    throw new Error(isAxiosError(error).message);
  }
};

export const updateCategoriesAsync = async (request) => {
  try {
    console.log("request edit", request);
    const response = await axiosInstance.post(`${url}`, {...request, action: "edit"});
    return response;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
};

export const deleteCategoriesAsync = async (request) => {
  try {
    const response = await axiosInstance.delete(`${url}?${new URLSearchParams(request).toString()}`)
    console.log("response delete", response);
    return response;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
}