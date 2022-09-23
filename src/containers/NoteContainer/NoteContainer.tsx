import classnames from 'classnames/bind';
import { FC } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Link } from 'react-router-dom';

import CardNote from 'src/components/CardNote';
import CardNoteSkeleton from 'src/components/CardNote/components/CardNoteSkeleton';
import { Note } from 'src/types';
import styles from './NoteContainer.module.scss';

interface Props {
  notes: Note[];
  isLoading: boolean;
  isTrash?: boolean;
  loadingItems?: number;
  header?: {
    text: string;
    color?: string;
    to?: string;
  };
}

const cx = classnames.bind(styles);

const LOADING_ITEM_DEFAULT = 8;

const NoteContainer: FC<Props> = ({
  notes,
  header,
  loadingItems = LOADING_ITEM_DEFAULT,
  isLoading = false,
  isTrash = false,
}) => {
  const renderHeader = () => {
    if (!header) return null;
    const { color, text, to } = header;
    if (to) {
      return (
        <Link
          className={cx('heading', 'heading-link')}
          to={to}
          onClick={(e) => (isLoading ? e.preventDefault() : null)}
        >
          {isLoading ? 'Loading...' : text}
          {color && <span style={{ backgroundColor: color }}></span>}
        </Link>
      );
    }

    return <h3 className={cx('heading')}>{isLoading ? 'Loading...' : text}</h3>;
  };

  const renderCardNote = () => {
    if (isLoading) {
      return Array(loadingItems)
        .fill(0)
        .map((item, index) => (
          <Col key={`note-skeleton-${index}`} xs={12} sm={6} md={6} lg={4} xl={3} xxxl={2.4}>
            <CardNoteSkeleton />
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
    <div className={cx('wrapper')}>
      {renderHeader()}
      <Container fluid style={{ padding: 0 }}>
        <Row gutterWidth={15}>{renderCardNote()}</Row>
      </Container>
    </div>
  );
};

export default NoteContainer;