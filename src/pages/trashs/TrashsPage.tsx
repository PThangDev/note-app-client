import classnames from 'classnames/bind';
import { FC } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet-async';

import CardNote from 'src/components/CardNote';
import useGetNotes from 'src/hooks/useGetNotes';
import styles from './TrashsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TrashsPage: FC<Props> = (props) => {
  const { data } = useGetNotes({ endpoint: '/trashs' });

  return (
    <>
      <Helmet>
        <title>Trashs</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <h3 className={cx('heading')}>Trashs</h3>
        <Container fluid style={{ padding: 0 }}>
          <Row gutterWidth={15}>
            {data.map((note) => {
              return (
                <Col key={note._id} xs={12} sm={6} md={6} lg={4} xl={3} xxxl={2.4}>
                  <CardNote note={note} isTrash />
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default TrashsPage;
