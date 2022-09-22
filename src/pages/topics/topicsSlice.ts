import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { topicAPI } from 'src/services';
import {
  BaseDataResponse,
  ErrorResponse,
  MetaPagination,
  Pagination,
  RejectValue,
} from 'src/types';
import { Topic } from 'src/types/Topic';

interface InitialState {
  isLoading: boolean;
  data: Topic[];
  pagination: Pagination;
}

const initialState: InitialState = {
  isLoading: false,
  data: [],
  pagination: {
    limit: 0,
    page_count: 0,
    page_size: 0,
    total: 0,
  },
};

export const fetchGetTopics = createAsyncThunk<
  BaseDataResponse<Topic[], MetaPagination>,
  undefined,
  RejectValue
>('/topics', async (payload, thunkAPI) => {
  try {
    const response = await topicAPI.getTopics();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetTopics.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGetTopics.fulfilled, (state, action) => {
        const { data, meta } = action.payload;
        state.isLoading = false;
        state.data = data;
        if (meta?.pagination) {
          state.pagination = meta.pagination;
        }
      })
      .addCase(fetchGetTopics.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload?.message);
      });
  },
});

export default topicsSlice;
