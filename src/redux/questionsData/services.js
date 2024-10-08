
import { axiosInstance, isAxiosError } from "@/app/services/api.services";

const url = "/api/questions";
export const getQuestionsByCategoryIdAsync = async (request) => {
  try {
    const response = await axiosInstance.get(`${url}?categoryId=${request}`);
    return response;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
};

export const addQuestionAsync = async (request) => {
  try {
    const req = {
      ...request,
      action: "add",
    }
    const response = await axiosInstance.post(url, req);
    return response;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
}

export const updateQuestionAsync = async (request) => {
  try {
    const req = {
      ...request,
      action: "update",
    }
    const response = await axiosInstance.put(url, req);
    return response;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
};

export const deleteQuestionAsync = async (request) => {
  try {
    const response = await axiosInstance.delete(url, { data: request });
    return response;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
}