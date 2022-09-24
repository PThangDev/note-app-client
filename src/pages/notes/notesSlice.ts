import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { noteAPI } from 'src/services';
import {
  BaseDataResponse,
  ErrorResponse,
  GetNotePayload,
  MetaPagination,
  NewNote,
  Note,
  NoteUpdate,
  Pagination,
  RejectValue,
  ToggleNoteToTrash,
} from 'src/types';
import { sweetAlert } from 'src/utils';

interface InitialState {
  isLoading: boolean;
  data: Note[];
  notesPinned: Note[];
  noteOthers: Note[];
  pagination: Pagination;
}

const initialState: InitialState = {
  isLoading: true,
  data: [],
  notesPinned: [],
  noteOthers: [],
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
export const fetchGetNotesPinned = createAsyncThunk<
  BaseDataResponse<Note[], MetaPagination>,
  GetNotePayload | undefined,
  RejectValue
>('/notes/pins', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.getNotes({ ...payload, endpoint: '/pins' });
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});
export const fetchGetNoteOthers = createAsyncThunk<
  BaseDataResponse<Note[], MetaPagination>,
  GetNotePayload | undefined,
  RejectValue
>('/notes/others', async (payload, thunkAPI) => {
  try {
    const response = await noteAPI.getNotes({ ...payload, endpoint: '/others' });
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

export const fetchUpdateNote = createAsyncThunk<BaseDataResponse<Note>, NoteUpdate, RejectValue>(
  '/notes/:id/updated',
  async (payload, thunkAPI) => {
    try {
      const response = await noteAPI.updateNote(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error as ErrorResponse);
    }
  }
);

export const fetchToggleNoteToTrash = createAsyncThunk<
  BaseDataResponse<Note>,
  ToggleNoteToTrash & { message?: string },
  RejectValue
>('/notes/:id-[toggle-note-to-trash]', async (payload, thunkAPI) => {
  try {
    const { message } = payload;
    const response = await noteAPI.toggleNoteToTrash(payload);

    if (message) {
      return { ...response, message };
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error as ErrorResponse);
  }
});

export const fetchDeleteNote = createAsyncThunk<BaseDataResponse<Note>, string, RejectValue>(
  '/notes/:id-[delete-note]',
  async (payload, thunkAPI) => {
    try {
      const response = await noteAPI.deleteNote(payload);
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
        if (action.meta.arg?.endpoint) return;

        if (action.meta.arg?.params?.page !== undefined) {
          state.isLoading = true;
        }
      })
      .addCase(fetchGetNotes.fulfilled, (state, action) => {
        // if (action.meta.arg?.endpoint) return;

        const { data, meta } = action.payload;

        state.isLoading = false;
        state.data = data;
        state.pagination = meta?.pagination as Pagination;
      })
      .addCase(fetchGetNotes.rejected, (state, action) => {
        if (action.meta.arg?.endpoint) return;
        state.isLoading = false;
      })
      // Get notes pinned
      .addCase(fetchGetNotesPinned.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.notesPinned = data;
      })
      // Get notes others
      .addCase(fetchGetNoteOthers.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.noteOthers = data;
      })
      // Create a new note
      .addCase(fetchCreateNote.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchCreateNote.fulfilled, (state, action) => {
        const { data, message } = action.payload;
        state.data = [data, ...state.data];
        sweetAlert.close();
        toast.success(message);
      })
      .addCase(fetchCreateNote.rejected, (state, action) => {
        sweetAlert.error(action.payload?.message);
      })
      // Update note
      .addCase(fetchUpdateNote.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchUpdateNote.fulfilled, (state, action) => {
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
      .addCase(fetchUpdateNote.rejected, (state, action) => {
        sweetAlert.error(action.payload?.message);
      })
      // Delete Note
      .addCase(fetchDeleteNote.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchDeleteNote.fulfilled, (state, action) => {
        const { data, message } = action.payload;
        state.data = state.data.filter((note) => note._id !== data._id);

        sweetAlert.success(message);
      })
      .addCase(fetchDeleteNote.rejected, (state, action) => {
        sweetAlert.error(action.payload?.message);
      })
      // Toggle note to trash
      .addCase(fetchToggleNoteToTrash.pending, (state, action) => {
        sweetAlert.loading();
      })
      .addCase(fetchToggleNoteToTrash.fulfilled, (state, action) => {
        const { data, message } = action.payload;
        state.data = state.data.filter((note) => note._id !== data._id);
        state.noteOthers = state.noteOthers.filter((note) => note._id !== data._id);
        state.notesPinned = state.notesPinned.filter((note) => note._id !== data._id);
        sweetAlert.success(message);
      })
      .addCase(fetchToggleNoteToTrash.rejected, (state, action) => {
        sweetAlert.error(action.payload?.message);
      });
  },
});
export default notesSlice;
