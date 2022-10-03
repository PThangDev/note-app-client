import { faCirclePlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import qs from 'query-string';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Pagination from 'src/components/Pagination';
import { constants, routePaths } from 'src/configs';
import NoteContainer from 'src/containers/NoteContainer';
import useDebounce from 'src/hooks/useDebounce';
import useGetNotes from 'src/hooks/useGetNotes';
import useGetTopics from 'src/hooks/useGetTopics';
import { Button, Checkbox, Input } from 'src/themes/UI';
import styles from './NotesPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const NotesPage: FC<Props> = (props) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [sortField, setSortField] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();
  const { q, sort } = qs.parse(location.search);

  const handleSearchNotes = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchKeyword(searchValue);
  };

  const handleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    setSortField(sortValue);

    const queryParams = qs.stringify({ q, sort: sortValue });

    navigate({ search: queryParams });
  };

  const searchKeywordDebounced = useDebounce(searchKeyword);

  useEffect(() => {
    if (q) {
      setSearchKeyword(q.toString());
    }
    if (sort) {
      setSortField(sort.toString());
    }
  }, [location.search, q, sort]);

  useEffect(() => {
    const queryParams = qs.stringify(
      { q: searchKeywordDebounced || null, sort },
      { skipNull: true }
    );

    navigate({ search: queryParams });
  }, [navigate, q, searchKeyword, searchKeywordDebounced, sort]);

  const { data, isLoading, pagination } = useGetNotes({
    params: { is_trash: false, limit: constants.LIMIT_NOTE },
  });

  // const topics = useGetTopics(undefined, false);

  return (
    <>
      <Helmet>
        <title>Notes</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('actions')}>
          <Link to={routePaths.newNote.path}>
            <Button icon={<FontAwesomeIcon icon={faCirclePlus} />}>Create a new note</Button>
          </Link>
        </div>
        <div className={cx('filter')}>
          <div className={cx('form')}>
            <Input
              className={cx('search')}
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              placeholder="Enter your keyword..."
              value={searchKeyword}
              onChange={handleSearchNotes}
            />
            <select className={cx('sort')} value={sortField} onChange={handleChangeSort}>
              <option value="">Choose options</option>
              <option value="createdAt">1. Descending created at</option>
              <option value="-createdAt">2. Ascending created at</option>
              <option value="title">3. Descending title</option>
              <option value="-title">4. Ascending title</option>
            </select>
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
