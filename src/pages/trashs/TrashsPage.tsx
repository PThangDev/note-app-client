import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import NoteContainer from 'src/containers/NoteContainer';
import useGetNotes from 'src/hooks/useGetNotes';
import styles from './TrashsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TrashsPage: FC<Props> = (props) => {
  const { data, isLoading } = useGetNotes({ endpoint: '/trashs' });

  return (
    <>
      <Helmet>
        <title>Trashs</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <h3 className={cx('heading')}>Trashs</h3>
        <NoteContainer notes={data} isLoading={isLoading} isTrash />
      </div>
    </>
  );
};

export default TrashsPage;
