import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNotesPinned } from 'src/pages/notes/notesSlice';

type Props = {};

const useGetNoteOthers = () => {
  const dispatch = useAppDispatch();

  const { noteOthers } = useAppSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchGetNotesPinned());
  }, [dispatch]);

  return noteOthers;
};
export default useGetNoteOthers;
