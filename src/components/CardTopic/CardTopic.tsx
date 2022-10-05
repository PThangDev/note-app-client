import classnames from 'classnames/bind';
import { ChangeEvent, FC, useState } from 'react';

import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'src/app/hooks';
import Modal from 'src/components/Modal';
import { routePaths } from 'src/configs';
import { fetchDeleteTopic } from 'src/pages/topics/topicsSlice';
import { Checkbox } from 'src/themes/UI';
import { Topic } from 'src/types';
import { formatDate, sweetAlert } from 'src/utils';
import FormTopic from '../Form/FormTopic';
import styles from './CardTopic.module.scss';

interface Props {
  topic: Topic;
  fullContent?: boolean;
  checked?: boolean;
  disabled?: boolean;
  onSelect?: (topic: Topic) => void;
}

const cx = classnames.bind(styles);

const CardTopic: FC<Props> = ({
  topic,
  fullContent = true,
  disabled = false,
  checked,
  onSelect,
}) => {
  const dispatch = useAppDispatch();
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);

  const handleShowModalEdit = () => {
    setIsOpenModalEdit(true);
  };
  const handleCloseModalEdit = () => {
    setIsOpenModalEdit(false);
  };

  const handleDeleteTopic = async () => {
    const result = await sweetAlert.confirm({ text: 'Do you want to hard delete topic!' });
    if (result.isConfirmed) {
      dispatch(fetchDeleteTopic(topic._id));
    }
  };

  const handleSelectTopic = (e: ChangeEvent<HTMLInputElement>) => {
    if (onSelect) {
      onSelect(topic);
    }
  };

  return (
    <>
      <div
        className={cx('wrapper', { 'hide-content': !fullContent, disabled })}
        style={{ background: topic.background }}
      >
        <div className={cx('top')}>
          <Checkbox
            className={cx('checkbox')}
            id={topic._id}
            name={topic.name}
            label={topic.name}
            checked={checked}
            onChange={handleSelectTopic}
          />
          <div className={cx('actions')}>
            <Tippy content="Edit">
              <FontAwesomeIcon
                className={cx('icon')}
                icon={faPenToSquare}
                onClick={handleShowModalEdit}
              />
            </Tippy>
            <Tippy content="Delete">
              <FontAwesomeIcon className={cx('icon')} icon={faTrash} onClick={handleDeleteTopic} />
            </Tippy>
          </div>
        </div>
        {fullContent && (
          <>
            <Link to={`${routePaths.topics}/${topic._id}`} className={cx('description')}>
              {topic.description || (
                <span className={cx('description-empty')}>No description...</span>
              )}
            </Link>
            <div className={cx('footer')}>
              <span className={cx('created-at')}>{formatDate(topic.createdAt)}</span>
              <span className={cx('total-notes')}>({topic.notes.length} notes)</span>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <Modal isOpen={isOpenModalEdit} onClose={handleCloseModalEdit}>
        <FormTopic onClose={handleCloseModalEdit} topic={topic} />
      </Modal>
    </>
  );
};

export default CardTopic;
