import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search } from 'src/components/Filters';
import Sort from 'src/components/Filters/Sort';

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

  const sortOptions = [
    { title: '1. Desc created at', value: '-createdAt' },
    { title: '2. Asc created at', value: 'createdAt' },
    { title: '3. Desc name', value: '-name' },
    { title: '4. Asc name', value: 'name' },
  ];

  return (
    <>
      <Helmet>
        <title>{isLoading ? 'Loading...' : 'Topics'}</title>
        <meta name="description" content="Note App - PThangDev"></meta>
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <Button
            className={cx('btn-new')}
            icon={<FontAwesomeIcon icon={faCirclePlus} />}
            onClick={handleOpenModalFormTopic}
          >
            New topic
          </Button>
          <Search className={cx('search')} />
          <Sort className={cx('sort')} options={sortOptions} />
        </div>

        <div className={cx('topics')}>
          <TopicContainer topics={data} isLoading={isLoading} totalTopics={pagination.total} />
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
