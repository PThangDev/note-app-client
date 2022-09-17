import { BaseDataResponse, MessageResponse } from 'src/types';
import {
  ForgotPasswordResponse,
  UserForgotPassword,
  UserLogin,
  UserRegister,
  UserResponse,
} from 'src/types/User';
import axiosInstance from './axiosInstance';

const authAPI = {
  login(data: UserLogin): Promise<BaseDataResponse<UserResponse>> {
    const url = '/auth/login';
    return axiosInstance.post(url, data);
  },
  logout(): Promise<MessageResponse> {
    const url = '/auth/logout';
    return axiosInstance.get(url);
  },
  register(data: UserRegister): Promise<MessageResponse> {
    const url = '/auth/register';
    return axiosInstance.post(url, data);
  },
  verifyAccount(activeToken: string): Promise<BaseDataResponse<UserResponse>> {
    const url = `/auth/active/${activeToken}`;
    return axiosInstance.get(url);
  },
  forgotPassword(data: UserForgotPassword): Promise<BaseDataResponse<ForgotPasswordResponse>> {
    const url = `/auth/forgot-password`;
    return axiosInstance.post(url, data);
  },
};
export default authAPI;
