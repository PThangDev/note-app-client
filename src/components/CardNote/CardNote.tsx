import {
  faPenToSquare,
  faThumbTack,
  faTrash,
  faTrashCan,
  faTrashCanArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import MDEditor from '@uiw/react-md-editor';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from 'src/app/hooks';
import { routePaths } from 'src/configs';
import { fetchDeleteNote, fetchToggleNoteToTrash } from 'src/pages/notes/notesSlice';
import { Button } from 'src/themes/UI';
import { Spin } from 'src/themes/UI/Loading';
import { Note } from 'src/types';
import { formatDate, sweetAlert } from 'src/utils';
import { PinIcon } from '../Icons';
import styles from './CardNote.module.scss';

interface Props {
  note: Note;
  isTrash?: boolean;
  isShowSelect?: boolean;
  isLoading?: boolean;
  onToggleCheckbox?: (id: string) => void;
}

const cx = classnames.bind(styles);

const CardNote: FC<Props> = ({
  note,
  isLoading = false,
  isTrash = false,
  isShowSelect = false,
  onToggleCheckbox,
}) => {
  const dispatch = useAppDispatch();
  const { _id, content, title, topics, background, user, createdAt, slug, is_pin } = note;

  const handleMoveNoteToTrash = async () => {
    const result = await sweetAlert.confirm({ text: 'Do you want to move note to trash!' });
    if (result.isConfirmed) {
      dispatch(
        fetchToggleNoteToTrash({
          id: _id,
          is_trash: true,
          message: 'Move note to trash successfully',
        })
      );
    }
  };
  const handleRestoreNote = async () => {
    const result = await sweetAlert.confirm({ text: 'Do you want to restore note!' });
    if (result.isConfirmed) {
      dispatch(
        fetchToggleNoteToTrash({
          id: _id,
          is_trash: false,
          message: 'Restore note from trash successfully',
        })
      );
    }
  };

  const handleDeleteNote = async () => {
    const result = await sweetAlert.confirm({ text: 'Do you want to hard delete note!' });
    if (result.isConfirmed) {
      dispatch(fetchDeleteNote(_id));
    }
  };

  const handlePinNote = async () => {};

  const renderPinIcon = () => {
    if (isLoading) {
      return <Spin />;
    } else {
      if (is_pin) {
        return <FontAwesomeIcon icon={faThumbTack} />;
      }
      return <PinIcon onClick={handlePinNote} />;
    }
  };

  const renderButtonOptions = () => {
    if (isTrash) {
      return (
        <>
          <Tippy content="Restore">
            <Button onClick={handleRestoreNote}>
              <FontAwesomeIcon className={cx('icon')} icon={faTrashCanArrowUp} />
            </Button>
          </Tippy>
          <Tippy content="Delete">
            <Button status="error" onClick={handleDeleteNote}>
              <FontAwesomeIcon className={cx('icon')} icon={faTrashCan} />
            </Button>
          </Tippy>
        </>
      );
    }
    return (
      <>
        <Tippy content="Edit">
          <Button>
            <FontAwesomeIcon className={cx('icon')} icon={faPenToSquare} />
          </Button>
        </Tippy>
        <Tippy content="Move to trash">
          <Button status="error" onClick={handleMoveNoteToTrash}>
            <FontAwesomeIcon className={cx('icon')} icon={faTrash} />
          </Button>
        </Tippy>
      </>
    );
  };
  return (
    <>
      <div className={cx('wrapper')} style={{ background }}>
        <div className={cx('header')}>
          <div className={cx('header-inner')}>
            {/* {isShowSelect && <Checkbox id={_id} name="card" onChange={handleChangeCheckbox} />} */}

            <div className={cx('title')}>
              <label htmlFor={_id}>{title}</label>
            </div>
            {!isTrash && <div className={cx('actions')}>{renderPinIcon()}</div>}
          </div>
        </div>
        <div className={cx('content')} data-color-mode="dark">
          <MDEditor.Markdown
            className="md-editor-preview"
            source={content}
            style={{ whiteSpace: 'pre-wrap' }}
          />
          <Link to={`${routePaths.notes.path}/${_id}`} />
        </div>
        <div className={cx('options')}>
          <div className={cx('time')}>{formatDate(createdAt)}</div>
          <div className={cx('buttons')}>{renderButtonOptions()}</div>
        </div>
      </div>

      {/* Modals */}
    </>
  );
};

export default CardNote;
