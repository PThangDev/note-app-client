import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { topicAPI } from 'src/services';
import { BaseDataResponse, ErrorResponse, RejectValue, Topic } from 'src/types';

interface InitialStateProps {
  isLoading: boolean;
  data: Topic | null;
  success: boolean;
}

const initialState: InitialStateProps = {
  isLoading: false,
  data: null,
  success: false,
};

export const fetchGetTopicDetail = createAsyncThunk<BaseDataResponse<Topic>, string, RejectValue>(
  '/topics/:id',
  async (payload, thunkAPI) => {
    try {
      const response = await topicAPI.getTopicDetail(payload);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ErrorResponse);
    }
  }
);

const topicDetailSlice = createSlice({
  name: 'topic-detail',
  initialState,
  reducers: {
    updateTopic(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGetTopicDetail.pending, (state, action) => {
        state.isLoading = true;
        state.data = null;
      })
      .addCase(fetchGetTopicDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data || null;
      })
      .addCase(fetchGetTopicDetail.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.message);
      });
  },
});

export default topicDetailSlice;
