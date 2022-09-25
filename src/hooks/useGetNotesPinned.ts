import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNoteOthers } from 'src/pages/notes/notesSlice';

type Props = {};

const useGetNotesPinned = () => {
  const dispatch = useAppDispatch();

  const { notesPinned } = useAppSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchGetNoteOthers());
  }, [dispatch]);

  return notesPinned;
};
export default useGetNotesPinned;
