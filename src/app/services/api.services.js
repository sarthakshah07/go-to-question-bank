import axios from "axios";
import { showErrorMessage } from "./notification.services.js";
import { setupInterceptorTo } from "./setupInterceptor.js";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 1000 * 30,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstance = setupInterceptorTo(instance);

export const isAxiosError = (err) => {
  if (axios.isAxiosError(err)) {
    console.log("err", err);
    if (err.response) {
      showErrorMessage(err.response.data?.message || err.response.data?.error);
      return err.response.data;
    }
  }

  console.log("err after", err);
  showErrorMessage(err.message);
  return { status: err.code, message: err.message };
};
