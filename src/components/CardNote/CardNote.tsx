import { faThumbTack } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MDEditor from '@uiw/react-md-editor';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { routePaths } from 'src/configs';
import { Spin } from 'src/themes/UI/Loading';
import { Note } from 'src/types';
import { formatDate } from 'src/utils';
import styles from './CardNote.module.scss';

interface Props {
  note: Note;
  isTrash?: boolean;
  isShowSelect?: boolean;
  onToggleCheckbox?: (id: string) => void;
}

const cx = classnames.bind(styles);

const isLoading = false;

const Template: FC<Props> = ({ note, isTrash = false, isShowSelect = false, onToggleCheckbox }) => {
  const { _id, content, title, topics, background, user, createdAt, slug, is_pin } = note;

  return (
    <>
      <div className={cx('wrapper')} style={{ background }}>
        <div className={cx('header')}>
          <div className={cx('header-inner')}>
            {/* {isShowSelect && <Checkbox id={_id} name="card" onChange={handleChangeCheckbox} />} */}

            <div className={cx('title')}>
              <label htmlFor={_id}>{title}</label>
            </div>
            {!isTrash && (
              <div className={cx('actions')}>
                <span className={cx('btn-info')}>
                  {/* <i className="fa-solid fa-heart"></i> */}
                  {/* <i className="fa-solid fa-heart-circle-check"></i> */}
                </span>
                {isLoading ? (
                  <Spin />
                ) : (
                  // <img
                  //   className={cx('btn-pin')}
                  //   src={is_pin ? icons.iconPinnedActive : icons.iconPinned}
                  //   alt=""
                  //   onClick={handlePinNote}
                  // />
                  <FontAwesomeIcon icon={faThumbTack} />
                )}
              </div>
            )}
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
          {/* <div className={cx('buttons')}>{renderActionButtons()}</div> */}
        </div>
      </div>

      {/* Modals */}
    </>
  );
};

export default Template;
