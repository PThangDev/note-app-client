import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import Pagination from 'src/components/Pagination';
import { routePaths } from 'src/configs';
import NoteContainer from 'src/containers/NoteContainer';
import useGetNotes from 'src/hooks/useGetNotes';
import { Button } from 'src/themes/UI';
import styles from './NotesPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const NotesPage: FC<Props> = (props) => {
  const { data, isLoading, pagination } = useGetNotes({ params: { is_trash: false } });

  return (
    <>
      <Helmet>
        <title>Notes</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('actions')}>
          <Link to={routePaths.newNote.path}>
            <Button icon={<FontAwesomeIcon icon={faCirclePlus} />}>Create a new note</Button>
          </Link>
        </div>
        <NoteContainer notes={data} isLoading={isLoading} />
        <Pagination pageRangeDisplay={5} pagination={pagination} />
      </div>
    </>
  );
};

export default NotesPage;
