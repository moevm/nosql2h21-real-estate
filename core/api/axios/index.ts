import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { Response } from "core/types/api";
import toasts from "stores/toasts";

const myaxios = axios.create({
  // baseURL: process.env.API_PATH,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": process.env.API_PATH,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "access-control-allow-headers",
  },
  withCredentials: true,
});
// ;

myaxios.interceptors.request.use(
  (config: AxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
);

myaxios.interceptors.response.use(
  ({ data }: AxiosResponse<Response<any>>) => {
    if (data.success === true) {
      return data;
    }
    return data;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // TODO: create notification
      console.log(`Error 401`, error);
      toasts.addNotification("You are not logged in.", "warning");
      return myaxios.post(`/api/auth/signout`);
    }

    // eslint-disable-next-line consistent-return
    return Promise.reject(error);
  },
);

export default myaxios;
