import {
  faBiohazard,
  faBook,
  faClock,
  faFeather,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet-async';

import { PinIcon } from 'src/components/Icons';
import { routePaths } from 'src/configs';
import useGetInfoUser from 'src/hooks/useGetInfoUser';
import { Button } from 'src/themes/UI';
import InputOutline from 'src/themes/UI/Form/InputOutline';
import { formatDate } from 'src/utils';
import CardInfo from './components/CardInfo';
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
        <Container fluid style={{ padding: 0 }}>
          <Row>
            <Col xl={6}>
              <div className={cx('form')}>
                <div className={cx('header')}>
                  <h2>Profile</h2>
                </div>
                <div className={cx('avatar')}>
                  <img src={user?.avatar} alt={user?.username} />
                </div>
                <InputOutline
                  label="Full name"
                  placeholder={user?.fullname || 'Empty'}
                  defaultValue={user?.fullname}
                  readOnly
                />
                <InputOutline
                  label="Username"
                  placeholder={user?.username}
                  defaultValue={user?.username}
                  readOnly
                />
                <InputOutline
                  label="Email"
                  placeholder={user?.email}
                  defaultValue={user?.email}
                  readOnly
                />
                <InputOutline
                  label="Password"
                  placeholder={user?.password}
                  defaultValue={'**************'}
                  readOnly
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
                </div>
                <Button fullWidth>Update Profile</Button>
              </div>
            </Col>
            <Col xl={6}>
              <div className={cx('information')}>
                <div className={cx('header')}>
                  <h2>Infomation</h2>
                </div>
                <div className={cx('content')}>
                  <Container fluid style={{ padding: 0, width: '100%' }}>
                    <Row gutterWidth={12}>
                      <Col md={6} xl={6}>
                        <CardInfo
                          title="Notes"
                          content={user?.total_notes}
                          background="var(--primary-color)"
                          to={routePaths.notes}
                          icon={<FontAwesomeIcon icon={faBook} fontSize="30px" />}
                        />
                      </Col>
                      <Col md={6} xl={6}>
                        <CardInfo
                          title="Topics"
                          content={user?.total_topics}
                          background="var(--purple-color)"
                          to={routePaths.topics}
                          icon={<FontAwesomeIcon icon={faBiohazard} fontSize="30px" />}
                        />
                      </Col>
                      <Col md={4} xl={4}>
                        <CardInfo
                          title="Pins"
                          content={4}
                          background="var(--grey-color)"
                          to={routePaths.pins}
                          icon={<PinIcon width={35} height={35} />}
                        />
                      </Col>
                      <Col md={4} xl={4}>
                        <CardInfo
                          title="Trashs"
                          content={4}
                          background="var(--error-color)"
                          to={routePaths.trashs}
                          icon={<FontAwesomeIcon icon={faTrash} fontSize="30px" />}
                        />
                      </Col>
                      <Col md={4} xl={4}>
                        <CardInfo
                          title="Others"
                          content={4}
                          background="var(--orange-color)"
                          icon={<FontAwesomeIcon icon={faFeather} fontSize="30px" />}
                          to={routePaths.others}
                        />
                      </Col>
                    </Row>
                  </Container>
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
