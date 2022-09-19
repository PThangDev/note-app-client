import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNotes } from 'src/pages/notes/notesSlice';

interface Props {}

const useGetNotes = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);

  useEffect(() => {
    dispatch(fetchGetNotes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return notes;
};
export default useGetNotes;
