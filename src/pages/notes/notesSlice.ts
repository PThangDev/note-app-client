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
import { sweetAlert } from 'src/utils';

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

export const fetchMoveNoteToTrash = createAsyncThunk<BaseDataResponse<Note>, string, RejectValue>(
  '/notes/:id-[move-note-to-trash]',
  async (payload, thunkAPI) => {
    try {
      const response = await noteAPI.moveNoteToTrash(payload);
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
      // Get Notes
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
      })
      // Create a new note
      .addCase(fetchCreateNote.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchCreateNote.fulfilled, (state, action) => {
        const { data, message } = action.payload;
        state.data = [data, ...state.data];
        sweetAlert.success(message);
      })
      .addCase(fetchCreateNote.rejected, (state, action) => {
        sweetAlert.error(action.payload?.message);
      });
  },
});
export default notesSlice;
