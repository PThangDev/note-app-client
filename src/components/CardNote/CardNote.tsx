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
import { FC, memo, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from 'src/app/hooks';
import { routePaths } from 'src/configs';
import {
  fetchDeleteNote,
  fetchToggleNoteToPin,
  fetchToggleNoteToTrash,
} from 'src/pages/notes/notesSlice';
import { Button, Checkbox } from 'src/themes/UI';
import { Spin } from 'src/themes/UI/Loading';
import { Note } from 'src/types';
import { formatDate, sweetAlert } from 'src/utils';
import { PinIcon } from '../Icons';
import styles from './CardNote.module.scss';

interface Props {
  note: Partial<Note>;
  readOnly?: boolean;
  isTrash?: boolean;
  isShowSelect?: boolean;
  isLoading?: boolean;
  className?: string;
  checked?: boolean;
  onToggleCheckbox?: (id: string) => void;
}

const cx = classnames.bind(styles);

const CardNote: FC<Props> = ({
  note,
  readOnly = false,
  isLoading = false,
  isTrash = false,
  className,
  isShowSelect = false,
  checked = false,
  onToggleCheckbox,
}) => {
  const dispatch = useAppDispatch();
  const { _id, content, title, topics, background, user, createdAt, slug, is_pin } = note;

  const [isSubmmitting, setIsSubmmitting] = useState<boolean>(false);

  const contentRemoveAnchorTag = useMemo(() => {
    if (!content) return '';

    // Replace anchor tag to paragraph tag or code block
    const newContent = content
      .replaceAll(/<a href=.+">/g, '<p>')
      .replaceAll(/<a>/g, '<p>')
      .replaceAll(
        /\[.+\]\(.+\)/g,
        (searchValue: string, replaceValue: string) => `\`${searchValue}\``
      )
      .replaceAll(/#+/g, '');

    return newContent;
  }, [content]);

  const handleMoveNoteToTrash = async () => {
    const result = await sweetAlert.confirm({ text: 'Do you want to move note to trash!' });
    if (result.isConfirmed) {
      dispatch(
        fetchToggleNoteToTrash({
          id: _id as string,
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
          id: _id as string,
          is_trash: false,
          message: 'Restore note from trash successfully',
        })
      );
    }
  };

  const handleDeleteNote = async () => {
    const result = await sweetAlert.confirm({ text: 'Do you want to hard delete note!' });
    if (result.isConfirmed) {
      dispatch(fetchDeleteNote(_id as string));
    }
  };

  const handleTogglePinNote = async () => {
    try {
      setIsSubmmitting(true);
      const message = is_pin ? 'Unpin note successfully' : 'Pin note successfully';
      await dispatch(
        fetchToggleNoteToPin({ id: _id as string, is_pin: !is_pin, message })
      ).unwrap();
      setIsSubmmitting(false);
    } catch (error) {
      setIsSubmmitting(false);
    }
  };
  const handleToggleCheckbox = (id: string) => {
    onToggleCheckbox && onToggleCheckbox(id);
  };

  const renderPinIcon = () => {
    if (isTrash || readOnly) {
      return null;
    }

    if (isLoading || isSubmmitting) {
      return <Spin />;
    } else {
      if (is_pin) {
        return (
          <FontAwesomeIcon
            className={cx('icon-pin', { active: is_pin })}
            icon={faThumbTack}
            onClick={handleTogglePinNote}
          />
        );
      }
      return <PinIcon className={cx('icon-pin')} onClick={handleTogglePinNote} />;
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
          <Link className={cx('link-edit')} to={`${routePaths.notes}/edit/${_id}`}>
            <Button>
              <FontAwesomeIcon className={cx('icon')} icon={faPenToSquare} />
            </Button>
          </Link>
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
      <div
        className={cx('wrapper', { 'read-only': readOnly, [className as string]: className })}
        style={{ background }}
      >
        <div className={cx('header')}>
          <div className={cx('header-inner')}>
            <div className={cx('title')}>
              {isShowSelect && (
                <Checkbox
                  className={cx('checkbox')}
                  id={_id}
                  name="card"
                  checked={checked}
                  onChange={() => handleToggleCheckbox(_id || '')}
                />
              )}
              <label htmlFor={_id}>{title}</label>
            </div>
            <div className={cx('actions')}>{renderPinIcon()}</div>
          </div>
        </div>
        <div className={cx('content')} data-color-mode="dark">
          {readOnly ? (
            <MDEditor.Markdown className={cx('content-preview')} source={contentRemoveAnchorTag} />
          ) : (
            <Link className={cx('content-link')} to={`${routePaths.notes}/${_id}`}>
              <MDEditor.Markdown
                className={cx('content-preview')}
                source={contentRemoveAnchorTag}
                disableCopy
              />
            </Link>
          )}
        </div>

        {!readOnly && (
          <div className={cx('options')}>
            <div className={cx('time')}>{formatDate(createdAt)}</div>
            <div className={cx('buttons')}>{renderButtonOptions()}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default memo(CardNote);
