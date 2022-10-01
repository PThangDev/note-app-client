import { faCirclePlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import FormTopic from 'src/components/Form/FormTopic';
import Modal from 'src/components/Modal';
import { routePaths } from 'src/configs';
import NoteContainer from 'src/containers/NoteContainer';
import { Button } from 'src/themes/UI';
import { formatDate, sweetAlert } from 'src/utils';
import { fetchDeleteTopic } from '../topics/topicsSlice';
import styles from './TopicDetailPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TopicDetailPage: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpenFormTopic, setIsOpenFormTopic] = useState<boolean>(false);

  const { data, isLoading } = useAppSelector((state) => state.topicDetail);

  useEffect(() => {
    if (!data) {
      navigate(`${routePaths.topics.path}/${id}`, { replace: true });
    } else {
      navigate(`${routePaths.topics.path}/${id}/${data.slug}`, { replace: true });
    }
  }, [id, navigate, data]);

  const handleOpenFormTopic = () => {
    setIsOpenFormTopic(true);
  };
  const handleCloseFormTopic = () => {
    setIsOpenFormTopic(false);
  };

  const handleDeleteTopic = async () => {
    const result = await sweetAlert.confirm({ text: 'Do you want to hard delete topic!' });
    if (result.isConfirmed) {
      if (data) {
        await dispatch(fetchDeleteTopic(data._id)).unwrap();
        navigate(-1);
      } else {
        sweetAlert.error('ID topic is invalid');
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{data?.name}</title>
      </Helmet>

      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <h2>{data?.name}</h2>
          <div className={cx('actions')}>
            <Button icon={<FontAwesomeIcon icon={faPenToSquare} />} onClick={handleOpenFormTopic}>
              Edit
            </Button>
            <Button
              status="error"
              icon={<FontAwesomeIcon icon={faTrash} />}
              onClick={handleDeleteTopic}
            >
              Delete
            </Button>
          </div>
        </div>
        <div className={cx('description')}>
          <p className={cx('text')}>{data?.description}</p>
          <p className={cx('created-at')}>{formatDate(data?.createdAt)}</p>
        </div>
        <div className={cx('notes')}>
          <Link className={cx('notes-create')} to={`${routePaths.newNote.path}?topic=${id}`}>
            <Button icon={<FontAwesomeIcon icon={faCirclePlus} />}>Create a new note</Button>
          </Link>
          <NoteContainer notes={data?.notes || []} isLoading={isLoading} />
        </div>
      </div>

      <Modal isOpen={isOpenFormTopic} onClose={handleCloseFormTopic}>
        {data && <FormTopic topic={data} onClose={handleCloseFormTopic} />}
      </Modal>
    </>
  );
};

export default TopicDetailPage;
