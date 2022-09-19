import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet-async';

import CardNote from 'src/components/CardNote';
import useGetNotes from 'src/hooks/useGetNotes';
import { Button } from 'src/themes/UI';
import styles from './NotesPage.module.scss';

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
        <div className={cx('actions')}>
          <Button icon={<FontAwesomeIcon icon={faCirclePlus} />}>Create a new note</Button>
        </div>
        <Container fluid style={{ padding: 0 }}>
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
      {/* Modal */}
    </>
  );
};

export default NotesPage;
