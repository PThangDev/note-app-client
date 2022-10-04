import { Action, configureStore, Middleware, ThunkAction } from '@reduxjs/toolkit';

import authSlice from 'src/pages/auth/authSlice';
import noteDetailSlice from 'src/pages/note-detail/noteDetailSlice';
import notesSlice from 'src/pages/notes/notesSlice';
import topicDetailSlice from 'src/pages/topic-detail/topicDetailSlice';
import topicsSlice from 'src/pages/topics/topicsSlice';
import { User } from 'src/types';
import { storage } from 'src/utils';

const checkUnAuthorization: Middleware = (store) => (next) => (action) => {
  if (action.payload?.status === 401) {
    const user = storage.get<User>('user');
    if (user) {
      const { logout } = authSlice.actions;
      return store.dispatch(logout(action.payload?.message));
    }
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
    topicDetail: topicDetailSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(checkUnAuthorization),
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
