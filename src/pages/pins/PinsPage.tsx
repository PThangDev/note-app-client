import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import NoteContainer from 'src/containers/NoteContainer';
import useGetNotes from 'src/hooks/useGetNotes';

import styles from './PinsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const PinsPage: FC<Props> = (props) => {
  const { data, isLoading } = useGetNotes({ endpoint: '/pins' });
  return (
    <>
      <Helmet>
        <title>Pins</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <NoteContainer notes={data} isLoading={isLoading} />
      </div>
    </>
  );
};

export default PinsPage;
