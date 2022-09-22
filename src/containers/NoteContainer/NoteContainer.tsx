import classnames from 'classnames/bind';
import { FC } from 'react';
import { Col, Container, Row } from 'react-grid-system';

import CardNote from 'src/components/CardNote';
import { Note } from 'src/types';
import styles from './NoteContainer.module.scss';

interface Props {
  notes: Note[];
  isLoading: boolean;
  isTrash?: boolean;
}

const cx = classnames.bind(styles);

const NoteContainer: FC<Props> = ({ notes, isLoading, isTrash = false }) => {
  if (notes.length === 0) {
    if (isLoading) {
      return <div className={cx('loading')}>Loading...</div>;
    }
    return (
      <div className={cx('empty')}>
        <p className={cx('empty-heading')}>Empty Note</p>
      </div>
    );
  }

  return (
    <Container fluid style={{ padding: 0 }}>
      <Row gutterWidth={15}>
        {notes.map((note) => {
          return (
            <Col key={note._id} xs={12} sm={6} md={6} lg={4} xl={3} xxxl={2.4}>
              <CardNote note={note} isTrash={isTrash} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default NoteContainer;
