import { FC } from 'react';
import classnames from 'classnames/bind';

import styles from './NotesPage.module.scss';
import useGetNotes from 'src/hooks/useGetNotes';
import CardNote from 'src/components/CardNote';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet-async';

interface Props {}

const cx = classnames.bind(styles);

const NotesPage: FC<Props> = (props) => {
  const { data, isLoading, pagination } = useGetNotes();
  return (
    <>
      <Helmet>
        <title>Notes</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <Container fluid>
          <Row gutterWidth={15}>
            {data.map((note) => {
              return (
                <Col key={note._id} xs={12} sm={6} md={6} lg={4} xl={3} xxxl={2.4}>
                  <CardNote note={note} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default NotesPage;
