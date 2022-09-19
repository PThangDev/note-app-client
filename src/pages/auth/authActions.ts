import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from 'src/services';
import {
  AccessToken,
  ActiveToken,
  BaseDataResponse,
  MessageResponse,
  RefreshToken,
  RejectValue,
  User,
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
    return thunkAPI.rejectWithValue(error as MessageResponse);
  }
});

export const fetchRegister = createAsyncThunk<
  BaseDataResponse<null, ActiveToken>,
  UserRegister,
  RejectValue
>('/auth/register', async (payload, thunkAPI) => {
  try {
    const response = await authAPI.register(payload);

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as MessageResponse);
  }
});
