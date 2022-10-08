import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import FormTopic from 'src/components/Form/FormTopic';
import Modal from 'src/components/Modal';
import Pagination from 'src/components/Pagination';
import TopicContainer from 'src/containers/TopicContainer';
import useGetTopics from 'src/hooks/useGetTopics';
import { Button } from 'src/themes/UI';
import styles from './TopicsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TopicsPage: FC<Props> = (props) => {
  const { data, isLoading, pagination } = useGetTopics();

  const [isOpenModalFormTopic, setIsOpenModalFormTopic] = useState<boolean>(false);

  const handleCloseModalFormTopic = () => {
    setIsOpenModalFormTopic(false);
  };

  const handleOpenModalFormTopic = () => {
    setIsOpenModalFormTopic(true);
  };

  return (
    <>
      <Helmet>
        <title>Topics</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <Button icon={<FontAwesomeIcon icon={faCirclePlus} />} onClick={handleOpenModalFormTopic}>
            New topic
          </Button>
        </div>

        <div className={cx('topics')}>
          <TopicContainer topics={data} isLoading={isLoading} />
          <Pagination pagination={pagination} />
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isOpenModalFormTopic} onClose={handleCloseModalFormTopic}>
        <FormTopic onClose={handleCloseModalFormTopic} />
      </Modal>
    </>
  );
};

export default TopicsPage;
