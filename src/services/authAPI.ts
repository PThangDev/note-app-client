import {
  AccessToken,
  ActiveToken,
  BaseDataResponse,
  MessageResponse,
  RefreshToken,
} from 'src/types';
import {
  ForgotPasswordResponse,
  GoogleLoginResonse,
  User,
  UserForgotPassword,
  UserLogin,
  UserRegister,
  UserResetPasswordRequest,
} from 'src/types/User';
import axiosInstance from './axiosInstance';

const authAPI = {
  login(data: UserLogin): Promise<BaseDataResponse<User, AccessToken & RefreshToken>> {
    const url = '/auth/login';
    return axiosInstance.post(url, data);
  },
  loginByGoogle(
    data: GoogleLoginResonse
  ): Promise<BaseDataResponse<User, AccessToken & RefreshToken>> {
    const url = '/auth/google-login';
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
  getInfoAccount(): Promise<BaseDataResponse<User>> {
    const url = '/auth/info-account';
    return axiosInstance.get(url);
  },
  verifyAccount(activeToken: string): Promise<BaseDataResponse<User>> {
    const url = `/auth/active-account`;
    return axiosInstance.put(url, { activeToken });
  },
  forgotPassword(data: UserForgotPassword): Promise<BaseDataResponse<ForgotPasswordResponse>> {
    const url = `/auth/forgot-password`;
    return axiosInstance.post(url, data);
  },
  resetPassword(payload: UserResetPasswordRequest): Promise<BaseDataResponse> {
    const { data, token } = payload;

    const url = `/auth/reset-password`;

    return axiosInstance.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default authAPI;
