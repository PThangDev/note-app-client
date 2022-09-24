import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNotes } from 'src/pages/notes/notesSlice';
import { GetNotePayload } from 'src/types';
import useGetParams from './useGetParams';

interface Props {}

const useGetNotes = (payload?: GetNotePayload) => {
  const dispatch = useAppDispatch();

  const notes = useAppSelector((state) => state.notes);
  const { limit, page, sort, q } = useGetParams();

  useEffect(() => {
    dispatch(
      fetchGetNotes({
        endpoint: payload?.endpoint,
        params: {
          limit: limit as string,
          page: page as string,
          sort: sort as string,
          q: q as string,
          ...payload?.params,
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, limit, page, q, sort]);
  return notes;
};
export default useGetNotes;
