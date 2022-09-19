import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetNoteDetail } from 'src/pages/note-detail/noteDetailSlice';

type Props = {};

const useGetNoteDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const noteDetail = useAppSelector((state) => state.noteDetail);

  useEffect(() => {
    if (id === undefined) return;

    dispatch(fetchGetNoteDetail(id));
  }, [dispatch, id]);

  return noteDetail;
};

export default useGetNoteDetail;
