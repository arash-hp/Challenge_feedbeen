import axios, { AxiosInstance, AxiosResponse } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com/",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
