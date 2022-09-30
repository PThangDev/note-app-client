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
import { GetTopicsPayload, NewTopic, Topic, TopicUpdateRequest } from 'src/types/Topic';
import { sweetAlert } from 'src/utils';

interface InitialState {
  isLoading: boolean;
  data: Topic[];
  pagination: Pagination;
}

const initialState: InitialState = {
  isLoading: true,
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
  GetTopicsPayload | undefined,
  RejectValue
>('/topics', async (payload, thunkAPI) => {
  try {
    const response = await topicAPI.getTopics(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

export const fetchCreateTopic = createAsyncThunk<BaseDataResponse<Topic>, NewTopic, RejectValue>(
  '/topics/new',
  async (payload, thunkAPI) => {
    try {
      const response = await topicAPI.createTopic(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ErrorResponse);
    }
  }
);

export const fetchUpdateTopic = createAsyncThunk<
  BaseDataResponse<Topic>,
  TopicUpdateRequest,
  RejectValue
>('/topics/:id/edit', async (payload, thunkAPI) => {
  try {
    const response = await topicAPI.updateTopic(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

export const fetchDeleteTopic = createAsyncThunk<BaseDataResponse<Topic>, string, RejectValue>(
  '/topics/:id/delete',
  async (payload, thunkAPI) => {
    try {
      const response = await topicAPI.deleteTopic(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ErrorResponse);
    }
  }
);

const topicsSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetTopics.pending, (state, action) => {
        // state.isLoading = true;
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
      })
      // Create new topic
      .addCase(fetchCreateTopic.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchCreateTopic.fulfilled, (state, action) => {
        const { data, message } = action.payload;
        state.data = [data, ...state.data];

        sweetAlert.close();
        toast.success(message);
      })
      .addCase(fetchCreateTopic.rejected, (state, action) => {
        sweetAlert.error(action.payload?.message);
      })
      // Update topic
      .addCase(fetchUpdateTopic.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchUpdateTopic.fulfilled, (state, action) => {
        const { data, message } = action.payload;
        state.data = state.data.map((note) => {
          if (note._id === data._id) {
            return data;
          }
          return note;
        });
        sweetAlert.close();
        toast.success(message);
      })
      .addCase(fetchUpdateTopic.rejected, (state, action) => {
        sweetAlert.error(action.payload?.message);
      })
      // Delete Topic
      .addCase(fetchDeleteTopic.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchDeleteTopic.fulfilled, (state, action) => {
        const { data, message } = action.payload;
        state.data = state.data.filter((topic) => topic._id !== data._id);
        sweetAlert.close();
        toast.success(message);
      })
      .addCase(fetchDeleteTopic.rejected, (state, action) => {
        sweetAlert.error(action.payload?.message);
      });
  },
});

export default topicsSlice;
