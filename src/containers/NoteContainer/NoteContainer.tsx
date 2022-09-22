import classnames from 'classnames/bind';
import { FC } from 'react';
import { Col, Container, Row } from 'react-grid-system';

import CardNote from 'src/components/CardNote';
import CardNoteSkeleton from 'src/components/CardNote/components/CardNoteSkeleton';
import { Note } from 'src/types';
import styles from './NoteContainer.module.scss';

interface Props {
  notes: Note[];
  isLoading: boolean;
  isTrash?: boolean;
}

const cx = classnames.bind(styles);

const ITEM_LOADING = 8;

const NoteContainer: FC<Props> = ({ notes, isLoading, isTrash = false }) => {
  const renderCardNote = () => {
    if (isLoading) {
      return Array(ITEM_LOADING)
        .fill(0)
        .map((item, index) => (
          <Col xs={12} sm={6} md={6} lg={4} xl={3} xxxl={2.4}>
            <CardNoteSkeleton key={`note-skeleton-${index}`} />
          </Col>
        ));
    } else {
      if (notes.length === 0) {
        return <div className={cx('empty')}>Empty Item</div>;
      }
      return notes.map((note) => (
        <Col key={note._id} xs={12} sm={6} md={6} lg={4} xl={3} xxxl={2.4}>
          <CardNote note={note} isTrash={isTrash} />
        </Col>
      ));
    }
  };

  return (
    <Container fluid style={{ padding: 0 }}>
      <Row gutterWidth={15}>{renderCardNote()}</Row>
    </Container>
  );
};

export default NoteContainer;
