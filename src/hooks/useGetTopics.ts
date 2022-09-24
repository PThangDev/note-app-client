import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetTopics } from 'src/pages/topics/topicsSlice';
import { GetTopicsPayload } from 'src/types';

interface Props {}

const useGetTopics = (payload?: GetTopicsPayload) => {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topics);

  useEffect(() => {
    const _payload = payload?.params ? { ...payload } : undefined;

    dispatch(fetchGetTopics(_payload));
  }, [dispatch, payload?.params?.q]);

  return topics;
};
export default useGetTopics;
