import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import { routePaths } from 'src/configs';
import useGetTopicDetail from 'src/hooks/useGetTopicDetail';

interface Props {}

const TopicDetailRouter: FC<Props> = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useGetTopicDetail();

  useEffect(() => {
    if (data) {
      navigate(`${routePaths.topics.path}/${id}/${data.slug}`, {
        replace: true,
      });
    }
  }, [id, navigate, data]);

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>{`${data?.name || 'Loading...'}`}</title>
      </Helmet>
      {/* Main */}
    </>
  );
};
export default TopicDetailRouter;
