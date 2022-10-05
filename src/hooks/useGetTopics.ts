import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetTopics } from 'src/pages/topics/topicsSlice';
import { GetTopicsPayload } from 'src/types';

interface Props {}

const useGetTopics = (payload?: GetTopicsPayload, filter: boolean = true) => {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topics);

  useEffect(() => {
    const _payload = payload?.params ? { ...payload } : undefined;

    if (filter) {
      dispatch(fetchGetTopics(_payload));
    } else {
      dispatch(fetchGetTopics());
    }
  }, [dispatch, payload?.params?.q, filter]);

  return topics;
};
export default useGetTopics;
