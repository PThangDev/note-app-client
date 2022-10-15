import { faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';

import { useAppDispatch } from 'src/app/hooks';
import CardNoteSkeleton from 'src/components/CardNote/components/CardNoteSkeleton';
import CardTopic from 'src/components/CardTopic';
import Empty from 'src/components/Empty';
import { fetchDeleteManyTopics } from 'src/pages/topics/topicsSlice';
import { Button } from 'src/themes/UI';
import { Topic } from 'src/types';
import { sweetAlert } from 'src/utils';
import styles from './TopicContainer.module.scss';

interface Props {
  topics: Topic[];
  isLoading?: boolean;
  loadingItems?: number;
}

const cx = classnames.bind(styles);

const TopicContainer: FC<Props> = ({ topics, isLoading = false, loadingItems = 10 }) => {
  const dispatch = useAppDispatch();
  const [topicsSelected, setTopicsSelected] = useState<Topic[]>([]);

  const handleSelectTopic = (topic: Topic) => {
    setTopicsSelected((prevTopicsSelected) => {
      if (prevTopicsSelected.find((tp) => tp._id === topic._id)) {
        return topicsSelected.filter((tp) => tp._id !== topic._id);
      }
      return [...prevTopicsSelected, topic];
    });
  };

  const handleRemoveTopicsSelected = () => setTopicsSelected([]);

  const handleDeleteManyTopics = async () => {
    const result = await sweetAlert.confirm({ text: `Delete ${topicsSelected.length} topics` });

    if (result.isConfirmed) {
      const topicIds = topicsSelected.map((topic) => topic._id);
      await dispatch(fetchDeleteManyTopics(topicIds)).unwrap();
      setTopicsSelected([]);
    }
  };

  const renderCardNote = () => {
    if (isLoading) {
      return Array(loadingItems)
        .fill(0)
        .map((item, index) => (
          <Col
            key={`note-skeleton-${index}`}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            xxl={2.4}
            xxxl={2}
          >
            <CardNoteSkeleton />
          </Col>
        ));
    }
    if (topics.length === 0) {
      return <Empty title="Empty Topic" />;
    }

    return topics.map((topic) => (
      <Col key={topic._id} xs={12} sm={6} md={4} lg={4} xl={3} xxl={2.4} xxxl={2}>
        <CardTopic
          topic={topic}
          onSelect={handleSelectTopic}
          checked={!!topicsSelected.find((tp) => tp._id === topic._id) || false}
        />
      </Col>
    ));
  };
  return (
    <div className={cx('wrapper')}>
      {topicsSelected.length > 0 && (
        <div className={cx('actions')}>
          <Button
            status="warning"
            icon={<FontAwesomeIcon icon={faTimesCircle} />}
            onClick={handleRemoveTopicsSelected}
          >
            Cancel
          </Button>
          <Button
            status="error"
            icon={<FontAwesomeIcon icon={faTrash} />}
            onClick={handleDeleteManyTopics}
          >
            Delete ({topicsSelected.length})
          </Button>
        </div>
      )}
      <Container fluid style={{ padding: 0 }}>
        <Row gutterWidth={15}>{renderCardNote()}</Row>
      </Container>
    </div>
  );
};

export default TopicContainer;
