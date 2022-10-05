import classnames from 'classnames/bind';
import { FC } from 'react';

import { Col, Container, Row } from 'react-grid-system';
import CardNoteSkeleton from 'src/components/CardNote/components/CardNoteSkeleton';
import CardTopic from 'src/components/CardTopic';
import Empty from 'src/components/Empty';
import { Topic } from 'src/types';
import styles from './TopicContainer.module.scss';

interface Props {
  topics: Topic[];
  isLoading?: boolean;
  loadingItems?: number;
}

const cx = classnames.bind(styles);

const TopicContainer: FC<Props> = ({ topics, isLoading = false, loadingItems = 8 }) => {
  const renderCardNote = () => {
    if (isLoading) {
      return Array(loadingItems)
        .fill(0)
        .map((item, index) => (
          <Col
            key={`note-skeleton-${index}`}
            xs={12}
            sm={6}
            md={6}
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
      <Col key={topic._id} xs={12} sm={6} md={6} lg={4} xl={3} xxl={2.4} xxxl={2}>
        <CardTopic topic={topic} />
      </Col>
    ));
  };
  return (
    <div className={cx('wrapper')}>
      <Container fluid style={{ padding: 0 }}>
        <Row gutterWidth={15}>{renderCardNote()}</Row>
      </Container>
    </div>
  );
};

export default TopicContainer;
