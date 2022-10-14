import classnames from 'classnames/bind';
import { FC } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Link } from 'react-router-dom';

import CardNote from 'src/components/CardNote';
import CardNoteSkeleton from 'src/components/CardNote/components/CardNoteSkeleton';
import Empty from 'src/components/Empty';
import { Note } from 'src/types';
import styles from './NoteContainer.module.scss';

interface Props {
  notes: Note[];
  notesSelected?: string[];
  isLoading: boolean;
  isTrash?: boolean;
  isShowSelect?: boolean;
  loadingItems?: number;
  hideEmptyItem?: boolean;
  header?: {
    text: string;
    color?: string;
    to?: string;
  };

  onToggleCheckbox?: (id: string) => void;
}

const cx = classnames.bind(styles);

const LOADING_ITEM_DEFAULT = 8;

const NoteContainer: FC<Props> = ({
  notes,
  notesSelected = [],
  header,
  hideEmptyItem = false,
  loadingItems = LOADING_ITEM_DEFAULT,
  isLoading = false,
  isTrash = false,
  isShowSelect,
  onToggleCheckbox,
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
          <span style={{ backgroundColor: color }}></span>
        </Link>
      );
    }

    return <h3 className={cx('heading')}>{isLoading ? 'Loading...' : text}</h3>;
  };

  const renderCardNote = () => {
    // Show Loading
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
    } // When note has loaded.
    else {
      // Render UI Empty Item when array notes was empty
      if (notes.length === 0) {
        return <Empty title="Empty Note" />;
      }
      // Render UI Card Note
      return notes.map((note) => (
        <Col
          key={note._id}
          style={{ padding: '0 5px' }}
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={3}
          xxl={2.4}
          xxxl={2}
        >
          <CardNote
            note={note}
            isTrash={isTrash}
            isShowSelect={isShowSelect}
            onToggleCheckbox={onToggleCheckbox}
            checked={notesSelected.includes(note._id)}
          />
        </Col>
      ));
    }
  };

  if (hideEmptyItem && notes.length === 0) {
    return null;
  }

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
