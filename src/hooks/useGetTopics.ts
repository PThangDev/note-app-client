import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { LIMIT_TOPIC } from 'src/configs/constants';
import { fetchGetTopics } from 'src/pages/topics/topicsSlice';
import { GetTopicsPayload } from 'src/types';
import useGetParams from './useGetParams';

interface Props {}

const useGetTopics = (payload?: GetTopicsPayload, filter: boolean = true) => {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.topics);
  const { limit = LIMIT_TOPIC, page, sort, q } = useGetParams();

  useEffect(() => {
    const _payload =
      payload?.params || limit || page || sort || q
        ? {
            params: {
              limit: limit?.toString(),
              page: page?.toString(),
              sort: page?.toString(),
              q: q?.toString(),
            },
            ...payload,
          }
        : undefined;

    if (filter) {
      dispatch(fetchGetTopics(_payload));
    } else {
      dispatch(fetchGetTopics());
    }
  }, [dispatch, payload?.params?.q, filter, limit, page, sort, q]);

  return topics;
};
export default useGetTopics;
