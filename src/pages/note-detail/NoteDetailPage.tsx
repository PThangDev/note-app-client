import {
  faPenToSquare,
  faTrash,
  faTrashCan,
  faTrashCanArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MDEditor from '@uiw/react-md-editor';
import classnames from 'classnames/bind';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { routePaths } from 'src/configs';
import { Button } from 'src/themes/UI';
import { formatDate, sweetAlert } from 'src/utils';
import { fetchDeleteNote, fetchToggleNoteToTrash } from '../notes/notesSlice';
import styles from './NoteDetailPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const NoteDetailPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useAppSelector((state) => state.noteDetail);

  useEffect(() => {
    if (!data) {
      navigate(`${routePaths.notes.path}/${id}`, { replace: true });
    } else {
      navigate(`${routePaths.notes.path}/${id}/${data.slug}`, { replace: true });
    }
  }, [id, navigate, data]);

  const handleMoveNoteToTrash = async () => {
    if (!data) return;

    const result = await sweetAlert.confirm({ text: 'Do you want to move note to trash!' });
    if (result.isConfirmed) {
      dispatch(
        fetchToggleNoteToTrash({
          id: data._id,
          is_trash: true,
          message: 'Move note to trash successfully',
        })
      );
    }
  };

  const handleRestoreNoteFromTrash = async () => {
    if (!data) return;

    const result = await sweetAlert.confirm({ text: 'Do you want to restore note!' });

    if (result.isConfirmed) {
      dispatch(
        fetchToggleNoteToTrash({
          id: data._id,
          is_trash: false,
          message: 'Restore note from trash successfully',
        })
      );
    }
  };

  const handleHardDeleteNote = async () => {
    if (!data) return;

    const result = await sweetAlert.confirm({ text: 'Do you want to hard delete note!' });

    if (result.isConfirmed) {
      await dispatch(fetchDeleteNote(data._id)).unwrap();
      navigate(-1);
    }
  };

  const renderActionButtons = () => {
    if (data?.is_trash) {
      return (
        <>
          <Button
            icon={<FontAwesomeIcon icon={faTrashCanArrowUp} />}
            onClick={handleRestoreNoteFromTrash}
          >
            Restore
          </Button>
          <Button
            status="error"
            icon={<FontAwesomeIcon icon={faTrashCan} />}
            onClick={handleHardDeleteNote}
          >
            Delete
          </Button>
        </>
      );
    }
    return (
      <>
        <Link className={cx('link-edit-note')} to={`${routePaths.notes.path}/edit/${data?._id}`}>
          <Button icon={<FontAwesomeIcon icon={faPenToSquare} />}>Edit</Button>
        </Link>
        <Button
          status="error"
          icon={<FontAwesomeIcon icon={faTrash} />}
          onClick={handleMoveNoteToTrash}
        >
          Delete
        </Button>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>{`${data?.title || 'Note App'}`}</title>
      </Helmet>
      {/* Main */}
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <h1 className={cx('heading')}>{data?.title}</h1>
          <div className={cx('actions')}>{renderActionButtons()}</div>
        </div>
        <div className={cx('info')}>
          <span className={cx('info-date')}>{formatDate(data?.createdAt)}</span>
          {data?.is_trash && (
            <span className={cx('info-sub')}>
              <FontAwesomeIcon className={cx('icon')} icon={faTrash} />
              Deleted
            </span>
          )}
        </div>
        <div className={cx('content')} data-color-mode="dark">
          <MDEditor.Markdown className="md-editor-preview" source={data?.content} />
        </div>
      </div>
    </>
  );
};

export default NoteDetailPage;
