import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { User } from 'src/types';
import { storage } from 'src/utils';
import { fetchLogin } from './authActions';

interface InitialState {
  isLoading: boolean;
  user: User | null;
  message: string;
  isAuthenticate: boolean;
}

const initialState: InitialState = {
  isLoading: false,
  user: storage.get<User>('user') || null,
  message: '',
  isAuthenticate: Boolean(storage.get('user')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticate(state) {
      const user = storage.get<User>('user');
      state.isAuthenticate = true;
      state.user = user;
    },
    logout(state, action: PayloadAction<string | undefined>) {
      storage.remove('user');
      storage.remove('access_token');
      storage.remove('refresh_token');

      state.isAuthenticate = false;
      state.user = null;

      if (action.payload) {
        toast.error(action.payload);
      }
    },
  },
  extraReducers(builder) {
    builder
      // Login
      .addCase(fetchLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, message, meta } = action.payload;
        if (data) {
          state.user = data;
          state.isAuthenticate = true;
          // Save data to storage
          storage.set('user', data);
          storage.set('access_token', meta?.access_token);
          storage.set('refresh_token', meta?.refresh_token);

          toast.success(message);
        }
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.message);
      });
  },
});

export default authSlice;
