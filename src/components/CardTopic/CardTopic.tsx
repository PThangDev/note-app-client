import classnames from 'classnames/bind';
import { FC, useState } from 'react';

import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import Modal from 'src/components/Modal';
import { Checkbox } from 'src/themes/UI';
import { Topic } from 'src/types';
import FormTopic from '../Form/FormTopic';
import styles from './CardTopic.module.scss';
import { formatDate, sweetAlert } from 'src/utils';
import { useAppDispatch } from 'src/app/hooks';
import { fetchDeleteTopic } from 'src/pages/topics/topicsSlice';
import { Link } from 'react-router-dom';
import { routePaths } from 'src/configs';

interface Props {
  topic: Topic;
}

const cx = classnames.bind(styles);

const CardTopic: FC<Props> = ({ topic }) => {
  const dispatch = useAppDispatch();
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);

  const handleShowModalEdit = () => {
    setIsOpenModalEdit(true);
  };
  const handleCloseModalEdit = () => {
    setIsOpenModalEdit(false);
  };

  const handleDeleteTopic = async () => {
    const result = await sweetAlert.confirm({ text: 'Do you want to hard delete note!' });
    if (result.isConfirmed) {
      dispatch(fetchDeleteTopic(topic._id));
    }
  };

  return (
    <>
      <div className={cx('wrapper')} style={{ background: topic.background }}>
        <div className={cx('top')}>
          <Checkbox
            className={cx('checkbox')}
            id={topic._id}
            name={topic.name}
            label={topic.name}
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
        <Link to={`${routePaths.topics.path}/${topic._id}`} className={cx('description')}>
          {topic.description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, quos commodi officia
          inventore illo quisquam quo sunt corporis fuga sit tempore excepturi animi porro odio
          mollitia, quae id labore repellat.
        </Link>
        <div className={cx('footer')}>
          <p className={cx('created-at')}>{formatDate(topic.createdAt)}</p>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isOpenModalEdit} onClose={handleCloseModalEdit}>
        <FormTopic onClose={handleCloseModalEdit} topic={topic} />
      </Modal>
    </>
  );
};

export default CardTopic;
