import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import Pagination from 'src/components/Pagination';
import NoteContainer from 'src/containers/NoteContainer';
import useGetNotes from 'src/hooks/useGetNotes';
import styles from './TrashsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TrashsPage: FC<Props> = (props) => {
  const { data, isLoading, pagination } = useGetNotes({ endpoint: '/trashs' });

  return (
    <>
      <Helmet>
        <title>Trashs</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <h2 className={cx('heading')}>Trashs</h2>
        <NoteContainer notes={data} isLoading={isLoading} isTrash />
        <Pagination pagination={pagination} />
      </div>
    </>
  );
};

export default TrashsPage;
