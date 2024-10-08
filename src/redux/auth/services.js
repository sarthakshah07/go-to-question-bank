
import { axiosInstance, isAxiosError } from "@/app/services/api.services";

const url = "/api/users"
export const loginByEmailAsync = async (request) => {
  try {
    console.log("request", request);
    const response = await axiosInstance.post(
      url,
      {
        email: request?.email,
        password: request?.password,
        action: "login",
      }
    );
    return response;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
};

export const continueWithGoogleAsync = async (request) => {
  try {
    const req = {
      ...request,
      action: "google",
    }
    const response = await axiosInstance.post(
      `${url}/userstatus`,
      req
    );
    return response;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
};



export const signUpAsync = async (request) => {
  try {
    const response = await axiosInstance.post(
      url,
      {
        name: request?.name,
        email: request?.email,
        mobile_number:request?.mobile_number,
        action: "signup",
        password: request?.password,
        userRole: "user",
      }
    );
    console.log("response", response);
    return response;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
};


export const getUsersListAsync = async (request) => {
  try {
    const response = await axiosInstance.get(
      `${url}?userId=${request}`
    );
    console.log("response", response);
    return response;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
}
export const updateUserStatusAsync = async (request) => {
  try {
    const response = await axiosInstance.post(
      url,
      {...request, action: "updateUserStatus"}
    );
    console.log("response", response);
    return response;
  } catch (error) {
    throw new Error(isAxiosError(error).message);
  }
}