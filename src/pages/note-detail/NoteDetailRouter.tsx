import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import { routePaths } from 'src/configs';
import useGetNoteDetail from 'src/hooks/useGetNoteDetail';

interface Props {}

const NoteDetailRouter: FC<Props> = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useGetNoteDetail();
  useEffect(() => {
    if (data) {
      console.log(data);
      navigate(`${routePaths.notes.path}/${id}/${data.slug}`, {
        replace: true,
      });
    }
  }, [id, navigate, data]);

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>{`${data?.title || 'Loading...'}`}</title>
      </Helmet>
      {/* Main */}
    </>
  );
};
export default NoteDetailRouter;