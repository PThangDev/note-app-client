import {
  AccessToken,
  ActiveToken,
  BaseDataResponse,
  MessageResponse,
  RefreshToken,
} from 'src/types';
import {
  ForgotPasswordResponse,
  User,
  UserForgotPassword,
  UserLogin,
  UserRegister,
} from 'src/types/User';
import axiosInstance from './axiosInstance';

const authAPI = {
  login(data: UserLogin): Promise<BaseDataResponse<User, AccessToken & RefreshToken>> {
    const url = '/auth/login';
    return axiosInstance.post(url, data);
  },
  logout(): Promise<MessageResponse> {
    const url = '/auth/logout';
    return axiosInstance.get(url);
  },
  register(data: UserRegister): Promise<BaseDataResponse<null, ActiveToken>> {
    const url = '/auth/register';
    return axiosInstance.post(url, data);
  },
  verifyAccount(activeToken: string): Promise<BaseDataResponse<User>> {
    const url = `/auth/active/${activeToken}`;
    return axiosInstance.get(url);
  },
  forgotPassword(data: UserForgotPassword): Promise<BaseDataResponse<ForgotPasswordResponse>> {
    const url = `/auth/forgot-password`;
    return axiosInstance.post(url, data);
  },
};
export default authAPI;
