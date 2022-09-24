import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNotes } from 'src/pages/notes/notesSlice';
import { GetNotePayload } from 'src/types';
import useGetParams from './useGetParams';

interface Props {}

const useGetNotes = (payload?: GetNotePayload) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const navigate = useNavigate();

  const notes = useAppSelector((state) => state.notes);
  const { limit, page, sort, q } = useGetParams();

  useEffect(() => {
    navigate(location.pathname, {});
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (location.state?.reload === false) return;

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
