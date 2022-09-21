import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { noteAPI } from 'src/services';
import {
  BaseDataResponse,
  ErrorResponse,
  GetNotePayload,
  MetaPagination,
  NewNote,
  Note,
  Pagination,
  RejectValue,
} from 'src/types';

interface InitialState {
  isLoading: boolean;
  data: Note[];
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

export const fetchGetNotes = createAsyncThunk<
  BaseDataResponse<Note[], MetaPagination>,
  GetNotePayload | undefined,
  RejectValue
>('/notes', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.getNotes(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

export const fetchCreateNote = createAsyncThunk<BaseDataResponse<Note>, NewNote, RejectValue>(
  '/notes/create',
  async (payload, thunkAPI) => {
    try {
      const response = await noteAPI.createNote(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ErrorResponse);
    }
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGetNotes.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchGetNotes.fulfilled, (state, action) => {
        const { data, meta } = action.payload;

        state.isLoading = false;
        state.data = data;
        state.pagination = meta?.pagination as Pagination;
      })
      .addCase(fetchGetNotes.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export default notesSlice;
