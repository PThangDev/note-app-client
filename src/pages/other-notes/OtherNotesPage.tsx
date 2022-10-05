import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import NoteContainer from 'src/containers/NoteContainer';
import useGetNotes from 'src/hooks/useGetNotes';
import styles from './OtherNotesPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const OtherNotesPage: FC<Props> = (props) => {
  const { data, isLoading } = useGetNotes({ endpoint: '/others' });
  return (
    <>
      <Helmet>
        <title>Pins</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <NoteContainer notes={data} header={{ text: 'Other Notes' }} isLoading={isLoading} />
      </div>
    </>
  );
};

export default OtherNotesPage;
