import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import Pagination from 'src/components/Pagination';

import NoteContainer from 'src/containers/NoteContainer';
import useGetNotes from 'src/hooks/useGetNotes';
import styles from './PinsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const PinsPage: FC<Props> = (props) => {
  const { data, isLoading, pagination } = useGetNotes({ endpoint: '/pins' });
  return (
    <>
      <Helmet>
        <title>Pins</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <NoteContainer header={{ text: 'Pins' }} notes={data} isLoading={isLoading} />
        <Pagination pagination={pagination} />
      </div>
    </>
  );
};

export default PinsPage;
