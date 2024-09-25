import axios from 'axios';
import { showSuccessMessage } from './notification.services';
import { getUser } from '@/commonServices/token.services';

const onRequest = async (config) => {
  // const user = getUser();
  // if (user && config.headers) {
  //   config.headers.Authorization = `Bearer ${user.accessToken}`;
  // }
  // if (config.data && !(config.data instanceof FormData)) {
  //   config.data = { data: encryptData(JSON.stringify(config.data)) };
  // }
  return config;
};

const onRequestError = (error) => Promise.reject(error);

const onResponseError = (error) => Promise.reject(error);

const onResponse = async (response) => {
  if (response.config.method !== 'get') {
    showSuccessMessage(response?.data.message);
  }
  return { ...response?.data, status: response.status };
};

export const setupInterceptorTo = (axiosObj) => {
  axiosObj.interceptors.request.use(onRequest, onRequestError);
  axiosObj.interceptors.response.use(onResponse, onResponseError);
  return axiosObj;
};