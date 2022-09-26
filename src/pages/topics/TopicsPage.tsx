import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet-async';

import useGetTopics from 'src/hooks/useGetTopics';
import { Button, Checkbox, Input } from 'src/themes/UI';
import styles from './TopicsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TopicsPage: FC<Props> = (props) => {
  const { data, isLoading } = useGetTopics();
  return (
    <>
      <Helmet>
        <title>Topics</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('header')}>Topics</div>

        <div className={cx('topics')}>
          <Container fluid>
            <Row>
              <Col xl={6}>
                <form className={cx('form')}>
                  <Input placeholder="Name" />
                  <div className={cx('buttons')}>
                    <Button type="submit">Submit</Button>
                    <Button status="error">Reset</Button>
                  </div>
                </form>
              </Col>
              <Col xl={6}>
                {data.map((topic) => (
                  <div
                    className={cx('card')}
                    key={topic._id}
                    style={{ background: topic.background }}
                  >
                    <Checkbox
                      className={cx('checkbox')}
                      id={topic._id}
                      name={topic.name}
                      label={topic.name}
                    />
                    <div className={cx('actions')}>
                      <Tippy content="Edit">
                        <FontAwesomeIcon className={cx('icon')} icon={faPenToSquare} />
                      </Tippy>
                      <Tippy content="Delete">
                        <FontAwesomeIcon className={cx('icon')} icon={faTrash} />
                      </Tippy>
                    </div>
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
};

export default TopicsPage;
