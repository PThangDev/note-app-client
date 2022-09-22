import { Action, configureStore, Middleware, ThunkAction } from '@reduxjs/toolkit';

import authSlice from 'src/pages/auth/authSlice';
import noteDetailSlice from 'src/pages/note-detail/noteDetailSlice';
import notesSlice from 'src/pages/notes/notesSlice';
import topicsSlice from 'src/pages/topics/topicsSlice';

const checkUnAuthorization: Middleware = (store) => (next) => (action) => {
  if (action.payload?.status === 401) {
    const { logout } = authSlice.actions;
    return store.dispatch(logout(action.payload?.errors.message));
  } else {
    next(action);
  }
};

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notes: notesSlice.reducer,
    noteDetail: noteDetailSlice.reducer,
    topics: topicsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(checkUnAuthorization),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
