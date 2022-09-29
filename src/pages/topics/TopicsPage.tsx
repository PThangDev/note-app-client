import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet-async';
import CardTopic from 'src/components/CardTopic';
import FormTopic from 'src/components/Form/FormTopic';
import Modal from 'src/components/Modal';

import useGetTopics from 'src/hooks/useGetTopics';
import { Button } from 'src/themes/UI';
import styles from './TopicsPage.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const TopicsPage: FC<Props> = (props) => {
  const { data, isLoading } = useGetTopics();

  const [isOpenModalFormTopic, setIsOpenModalFormTopic] = useState<boolean>(false);

  const handleCloseModalFormTopic = () => {
    setIsOpenModalFormTopic(false);
  };

  const handleOpenModalFormTopic = () => {
    setIsOpenModalFormTopic(true);
  };

  return (
    <>
      <Helmet>
        <title>Topics</title>
      </Helmet>
      <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <Button icon={<FontAwesomeIcon icon={faCirclePlus} />} onClick={handleOpenModalFormTopic}>
            Create a new topic
          </Button>
        </div>

        <div className={cx('topics')}>
          <Container fluid>
            <Row gutterWidth={15}>
              {data.map((topic) => (
                <Col key={topic._id} xl={3}>
                  <CardTopic topic={topic} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isOpenModalFormTopic} onClose={handleCloseModalFormTopic}>
        <FormTopic onClose={handleCloseModalFormTopic} />
      </Modal>
    </>
  );
};

export default TopicsPage;
