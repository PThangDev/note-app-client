import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Sort } from 'src/components/Filters';

import Pagination from 'src/components/Pagination';
import { constants, routePaths } from 'src/configs';
import NoteContainer from 'src/containers/NoteContainer';
import useGetNotes from 'src/hooks/useGetNotes';
import { Button } from 'src/themes/UI';
import styles from './NotesPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const NotesPage: FC<Props> = (props) => {
  const { data, isLoading, pagination } = useGetNotes({
    params: { is_trash: false, limit: constants.LIMIT_NOTE },
  });

  // const topics = useGetTopics(undefined, false);

  const sortOptions = [
    { title: '1. Desc created at', value: '-createdAt' },
    { title: '2. Asc created at', value: 'createdAt' },
    { title: '3. Desc title', value: '-title' },
    { title: '4. Asc title', value: 'title' },
  ];

  return (
    <>
      <Helmet>
        <title>Notes</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('actions')}>
          <div className={cx('form')}>
            <Link className={cx('link-new-note')} to={routePaths.newNote}>
              <Button icon={<FontAwesomeIcon icon={faCirclePlus} />}>New note</Button>
            </Link>
            <Search className={cx('search')} />
            <Sort className={cx('sort')} options={sortOptions} />
          </div>
          {/* <div className={cx('topics')}>
            <Container fluid style={{ padding: 0 }}>
              <Row>
                {topics.data.map((topic) => (
                  <Col key={topic._id} xl={2}>
                    <Checkbox className={cx('topic')} id={topic._id} label={topic.name} />
                  </Col>
                ))}
              </Row>
            </Container>
          </div> */}
        </div>
        <NoteContainer notes={data} isLoading={isLoading} />
        <Pagination pageRangeDisplay={5} pagination={pagination} />
      </div>
    </>
  );
};

export default NotesPage;
