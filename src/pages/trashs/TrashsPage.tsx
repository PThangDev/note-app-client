import {
  faSquareCheck,
  faTimesCircle,
  faTrashCan,
  faTrashCanArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { useAppDispatch } from 'src/app/hooks';
import Pagination from 'src/components/Pagination';
import { constants } from 'src/configs';
import NoteContainer from 'src/containers/NoteContainer';
import useGetNotes from 'src/hooks/useGetNotes';
import { Button } from 'src/themes/UI';
import { sweetAlert } from 'src/utils';
import { fetchDeleteManyNotes, fetchToggleManyNotesToTrash } from '../notes/notesSlice';
import styles from './TrashsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TrashsPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { data, isLoading, pagination } = useGetNotes({
    endpoint: '/trashs',
    params: { limit: constants.LIMIT_NOTE },
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

  const handleDeleteManyNotes = async () => {
    const result = await sweetAlert.confirm({
      text: `Do you want to hard delete ${notesSelected.length} notes`,
    });
    if (result.isConfirmed) {
      await dispatch(fetchDeleteManyNotes(notesSelected)).unwrap;
      setNotesSelected([]);
    }
  };

  const handleRestoreManyNotes = async () => {
    const result = await sweetAlert.confirm({
      text: `Do you want to restore ${notesSelected.length} notes`,
    });

    if (result.isConfirmed) {
      await dispatch(
        fetchToggleManyNotesToTrash({ noteIds: notesSelected, is_trash: false })
      ).unwrap();

      setNotesSelected([]);
    }
  };

  const isSelectAll = useMemo(
    () => notesSelected.length === data.length,
    [data.length, notesSelected.length]
  );

  return (
    <>
      <Helmet>
        <title>Trashs</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <h2 className={cx('heading')}>Trashs</h2>
        {notesSelected.length > 0 && (
          <div className={cx('actions')}>
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
              icon={<FontAwesomeIcon icon={faTrashCanArrowUp} />}
              onClick={handleRestoreManyNotes}
            >
              Restore ({notesSelected.length})
            </Button>
            <Button
              status="error"
              icon={<FontAwesomeIcon icon={faTrashCan} />}
              onClick={handleDeleteManyNotes}
            >
              Delete ({notesSelected.length})
            </Button>
          </div>
        )}
        <NoteContainer
          notes={data}
          isLoading={isLoading}
          isTrash
          isShowSelect
          onToggleCheckbox={handleToggleCheckbox}
          notesSelected={notesSelected}
        />
        <Pagination pagination={pagination} />
      </div>
    </>
  );
};

export default TrashsPage;
