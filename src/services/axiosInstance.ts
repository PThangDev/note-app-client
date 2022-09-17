import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserResponse } from 'src/types';
import storage from 'src/utils/storage';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    const user = storage.get<UserResponse>('user');
    if (user.access_token) {
      config.headers = {
        Authorization: `Bearer ${user.access_token}`,
      };
    }
    return config;
  },
  function (error: AxiosError) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // if (error.response?.status === 401) {
    //   return Promise.reject(error?.response);
    // }
    return Promise.reject(error?.response?.data);
    // return Promise.reject(error);
  }
);

export default axiosInstance;
