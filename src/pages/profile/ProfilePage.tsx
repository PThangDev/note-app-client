import {
  faBiohazard,
  faBook,
  faClock,
  faEnvelope,
  faLock,
  faUser,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet-async';

import useGetInfoUser from 'src/hooks/useGetInfoUser';
import { Button, Input } from 'src/themes/UI';
import { formatDate } from 'src/utils';
import styles from './ProfilePage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const ProfilePage: FC<Props> = (props) => {
  const user = useGetInfoUser();

  return (
    <>
      <Helmet>
        <title>{user?.username ? `Profile - ${user.username}` : 'Profile'}</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <Container fluid>
          <Row>
            <Col xl={6}>
              <div className={cx('form')}>
                <div className={cx('header')}>
                  <h2>Profile</h2>
                </div>
                <div className={cx('avatar')}>
                  <img src={user?.avatar} alt={user?.username} />
                </div>
                <Input
                  placeholder={user?.fullname || 'Empty'}
                  defaultValue={user?.fullname}
                  icon={<FontAwesomeIcon icon={faUserAstronaut} />}
                />
                <Input
                  placeholder={user?.username}
                  defaultValue={user?.username}
                  icon={<FontAwesomeIcon icon={faUser} />}
                />
                <Input
                  placeholder={user?.email}
                  defaultValue={user?.email}
                  icon={<FontAwesomeIcon icon={faEnvelope} />}
                />
                <Input
                  placeholder={user?.password}
                  defaultValue={'**************'}
                  icon={<FontAwesomeIcon icon={faLock} />}
                />
                <div className={cx('other-info')}>
                  <p className={cx('info-field', 'created-at')}>
                    <span>Created At :</span>
                    <span>
                      {formatDate(user?.createdAt)}
                      <FontAwesomeIcon className={cx('icon')} icon={faClock} />
                    </span>
                  </p>
                  <p className={cx('info-field', 'updated-at')}>
                    <span>Updated At :</span>
                    <span>
                      {formatDate(user?.updatedAt)}
                      <FontAwesomeIcon className={cx('icon')} icon={faClock} />
                    </span>
                  </p>
                  <p className={cx('info-field', 'total-notes')}>
                    <span>Total Notes :</span>
                    <span>
                      {user?.total_notes}
                      <FontAwesomeIcon className={cx('icon')} icon={faBook} />
                    </span>
                  </p>
                  <p className={cx('info-field', 'total-topics')}>
                    <span>Total Topics :</span>
                    <span>
                      {user?.total_topics}
                      <FontAwesomeIcon className={cx('icon')} icon={faBiohazard} />
                    </span>
                  </p>
                </div>

                <Button fullWidth>Update Profile</Button>
              </div>
            </Col>
            <Col xl={6}>
              <div className={cx('todo-list')}>
                <div className={cx('header')}>
                  <h2>Todo list</h2>
                  <span>(Comming soon...)</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProfilePage;
