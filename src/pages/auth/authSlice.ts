import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { UserResponse } from 'src/types';
import storage from 'src/utils/storage';

interface InitialState {
  isLoading: boolean;
  user: UserResponse | null;
  message: string;
  isAuthenticate: boolean;
}

const initialState: InitialState = {
  isLoading: false,
  user: storage.get<UserResponse>('user') || null,
  message: '',
  isAuthenticate: Boolean(storage.get('user')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticate(state) {
      const user = storage.get<UserResponse>('user');
      state.isAuthenticate = true;
      state.user = user;
    },
    logout(state, action: PayloadAction<string | undefined>) {
      storage.remove('user');
      state.isAuthenticate = false;
      state.user = null;

      if (action.payload) {
        toast.error(action.payload);
      }
    },
  },
});

export default authSlice;
