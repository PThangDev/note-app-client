import MDEditor from '@uiw/react-md-editor';
import classnames from 'classnames/bind';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppSelector } from 'src/app/hooks';
import { routePaths } from 'src/configs';
import { formatDate } from 'src/utils';
import styles from './NoteDetailPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const NoteDetailPage: FC<Props> = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, data } = useAppSelector((state) => state.noteDetail);

  useEffect(() => {
    if (!data) {
      navigate(`${routePaths.notes.path}/${id}`, { replace: true });
    }
  }, [id, navigate, data]);

  return (
    <>
      <Helmet>
        <title>{`${data?.title || 'Note App'}`}</title>
      </Helmet>
      {/* Main */}
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <h1 className={cx('heading')}>{data?.title}</h1>
          <div className={cx('actions')}></div>
        </div>
        <div className={cx('info')}>{formatDate(data?.createdAt)}</div>
        <div className={cx('content')} data-color-mode="dark">
          <MDEditor.Markdown
            className="md-editor-preview"
            source={data?.content}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>
      </div>
    </>
  );
};

export default NoteDetailPage;
