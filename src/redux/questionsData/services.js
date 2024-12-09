
import { axiosInstance, isAxiosError } from "@/app/services/api.services";

const url = "/api/questions";
export const getQuestionsByCategoryIdAsync = async (request) => {
  try {
    const response = await axiosInstance.get(`${url}?categoryId=${request.categoryId}&userId=${request.userId}`);
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
    console.log("response", req);

    const response = await axiosInstance.post(url, req);
    console.log("response", response, req);
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
    const response = await axiosInstance.post(url, req);
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