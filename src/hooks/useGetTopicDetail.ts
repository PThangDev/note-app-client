import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { fetchGetTopicDetail } from 'src/pages/topic-detail/topicDetailSlice';

type Props = {};

const useGetTopicDetail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const topicDetail = useAppSelector((state) => state.topicDetail);

  useEffect(() => {
    if (id === undefined) return;

    dispatch(fetchGetTopicDetail(id));
  }, [dispatch, id]);

  return topicDetail;
};

export default useGetTopicDetail;
