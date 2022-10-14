import {
  faCirclePlus,
  faSquareCheck,
  faTimesCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { useAppDispatch } from 'src/app/hooks';
import { Search, Sort } from 'src/components/Filters';
import Pagination from 'src/components/Pagination';
import { constants, routePaths } from 'src/configs';
import NoteContainer from 'src/containers/NoteContainer';
import useGetNotes from 'src/hooks/useGetNotes';
import { Button } from 'src/themes/UI';
import { sweetAlert } from 'src/utils';
import styles from './NotesPage.module.scss';
import { fetchGetNotes, fetchToggleManyNotesToTrash } from './notesSlice';

interface Props {}

const cx = classnames.bind(styles);

const NotesPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, pagination } = useGetNotes({
    params: { is_trash: false, limit: constants.LIMIT_NOTE },
  });

  const [notesSelected, setNotesSelected] = useState<string[]>([]);

  const handleToggleCheckbox = (id: string) => {
    setNotesSelected((prevNotesSelected) => {
      if (prevNotesSelected.includes(id)) {
        return prevNotesSelected.filter((noteId) => noteId !== id);
      }
      return [...notesSelected, id];
    });
  };

  const handleClearNotesSelected = () => setNotesSelected([]);
  const handleSelectAllNotes = () => setNotesSelected(data.map((note) => note._id));

  const isSelectAll = useMemo(
    () => notesSelected.length === data.length,
    [data.length, notesSelected.length]
  );

  const handleMoveNotesToTrash = async () => {
    const result = await sweetAlert.confirm({
      text: `Do you want to move ${notesSelected.length} to trash`,
    });

    if (result.isConfirmed) {
      await dispatch(
        fetchToggleManyNotesToTrash({ noteIds: notesSelected, is_trash: true })
      ).unwrap();
      dispatch(fetchGetNotes({ params: { is_trash: false, limit: constants.LIMIT_NOTE } }));
      setNotesSelected([]);
    }
  };

  const sortOptions = [
    { title: '1. Desc created at', value: '-createdAt' },
    { title: '2. Asc created at', value: 'createdAt' },
    { title: '3. Desc title', value: '-title' },
    { title: '4. Asc title', value: 'title' },
  ];

  return (
    <>
      <Helmet>
        <title>Notes</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('actions')}>
          <div className={cx('form')}>
            <Link className={cx('link-new-note')} to={routePaths.newNote}>
              <Button icon={<FontAwesomeIcon icon={faCirclePlus} />}>New note</Button>
            </Link>
            <Search className={cx('search')} />
            <Sort className={cx('sort')} options={sortOptions} />
          </div>
        </div>
        {notesSelected.length > 0 && (
          <div className={cx('select-actions')}>
            <Button
              status="warning"
              icon={<FontAwesomeIcon icon={faTimesCircle} />}
              onClick={handleClearNotesSelected}
            >
              Clear All
            </Button>
            <Button
              status="success"
              icon={<FontAwesomeIcon icon={faSquareCheck} />}
              onClick={handleSelectAllNotes}
              disabled={isSelectAll}
            >
              Select All
            </Button>
            <Button
              status="error"
              icon={<FontAwesomeIcon icon={faTrash} />}
              onClick={handleMoveNotesToTrash}
            >
              Delete ({notesSelected.length})
            </Button>
          </div>
        )}
        <NoteContainer
          notes={data}
          isLoading={isLoading}
          isShowSelect
          onToggleCheckbox={handleToggleCheckbox}
          notesSelected={notesSelected}
        />
        {data.length > 0 && <Pagination pageRangeDisplay={5} pagination={pagination} />}
      </div>
    </>
  );
};

export default NotesPage;
