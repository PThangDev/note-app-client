import { faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from 'src/app/hooks';
import { NoteIcon } from 'src/components/Icons';
import { routePaths } from 'src/configs';
import { Note } from 'src/types';
import { fetchGetNoteDetail } from '../../noteDetailSlice';
import styles from './NotesRelated.module.scss';

interface Props {
  notes: Note[];
}

const cx = classnames.bind(styles);

const NotesRelated: FC<Props> = ({ notes }) => {
  const dispatch = useAppDispatch();

  const handleGetNoteDetail = (id: string) => {
    dispatch(fetchGetNoteDetail(id));
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h3>
          <FontAwesomeIcon className={cx('icon')} icon={faSun} />
          Notes Related
        </h3>
      </div>
      <div className={cx('notes')}>
        {notes.map((note) => (
          <Link
            className={cx('note-link')}
            to={`${routePaths.notes.path}/${note._id}`}
            key={`${note._id}-notes-related`}
            onClick={() => handleGetNoteDetail(note._id)}
          >
            <NoteIcon className={cx('note-icon')} />
            {note.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NotesRelated;
