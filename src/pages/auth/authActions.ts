import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from 'src/services';
import {
  AccessToken,
  ActiveToken,
  BaseDataResponse,
  ErrorResponse,
  ForgotPasswordResponse,
  GoogleLoginResonse,
  RefreshToken,
  RejectValue,
  User,
  UserForgotPassword,
  UserLogin,
  UserRegister,
} from 'src/types';

export const fetchLogin = createAsyncThunk<
  BaseDataResponse<User, AccessToken & RefreshToken>,
  UserLogin,
  RejectValue
>('/auth/login', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.login(payload);

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

export const fetchLoginByGoogle = createAsyncThunk<
  BaseDataResponse<User, AccessToken & RefreshToken>,
  GoogleLoginResonse,
  RejectValue
>('/auth/google-login', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.loginByGoogle(payload);

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

export const fetchRegister = createAsyncThunk<
  BaseDataResponse<null, ActiveToken>,
  UserRegister,
  RejectValue
>('/auth/register', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.register(payload);

    console.log(response);

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

export const fetchGetInfoUser = createAsyncThunk<BaseDataResponse<User>, undefined, RejectValue>(
  '/auth/info-account',
  async (payload, thunkAPI) => {
    try {
      const response = await authAPI.getInfoAccount();

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ErrorResponse);
    }
  }
);

export const fetchForgotPassword = createAsyncThunk<
  BaseDataResponse<ForgotPasswordResponse>,
  UserForgotPassword,
  RejectValue
>('/auth/forgot-password', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.forgotPassword(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});
