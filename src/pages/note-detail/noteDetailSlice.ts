import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { noteAPI } from 'src/services';
import { BaseDataResponse, ErrorResponse, Note, RejectValue } from 'src/types';

interface InitialStateProps {
  isLoading: boolean;
  data: Note | null;
  message: string;
}

const initialState: InitialStateProps = {
  isLoading: false,
  data: null,
  message: '',
};

export const fetchGetNoteDetail = createAsyncThunk<BaseDataResponse<Note>, string, RejectValue>(
  '/notes/:id',
  async (payload, thunkAPI) => {
    try {
      const response = await noteAPI.getNoteDetail(payload);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ErrorResponse);
    }
  }
);

const noteDetailSlice = createSlice({
  name: 'note-detail',
  initialState,
  reducers: {
    updateNoteDetail(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGetNoteDetail.pending, (state, action) => {
        state.isLoading = true;
        state.data = null;
      })
      .addCase(fetchGetNoteDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data || null;
      })
      .addCase(fetchGetNoteDetail.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.message);
      });
  },
});

export default noteDetailSlice;
