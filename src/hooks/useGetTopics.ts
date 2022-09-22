import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetTopics } from 'src/pages/topics/topicsSlice';

interface Props {}

const useGetTopics = () => {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topics);

  useEffect(() => {
    dispatch(fetchGetTopics());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return topics;
};
export default useGetTopics;
