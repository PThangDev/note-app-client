import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNotes } from 'src/pages/notes/notesSlice';
import { GetNotePayload } from 'src/types';

interface Props {}

const useGetNotes = (payload?: GetNotePayload) => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchGetNotes({ endpoint: payload?.endpoint, params: payload?.params }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return notes;
};
export default useGetNotes;
