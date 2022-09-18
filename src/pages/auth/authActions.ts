import { createAsyncThunk } from '@reduxjs/toolkit';

import { authAPI } from 'src/services';
import {
  AccessToken,
  BaseDataResponse,
  MessageResponse,
  RefreshToken,
  RejectValue,
  User,
  UserLogin,
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
