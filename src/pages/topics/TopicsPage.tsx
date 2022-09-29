import { faCirclePlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classnames from 'classnames/bind';
import { FC, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { Helmet } from 'react-helmet-async';
import FormTopic from 'src/components/Form/FormTopic';
import Modal from 'src/components/Modal';

import useGetTopics from 'src/hooks/useGetTopics';
import { Button, Checkbox } from 'src/themes/UI';
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
          <h3>Topics</h3>
          <Button icon={<FontAwesomeIcon icon={faCirclePlus} />} onClick={handleOpenModalFormTopic}>
            Create a new topic
          </Button>
        </div>

        <div className={cx('topics')}>
          <Container fluid>
            <Row gutterWidth={15}>
              {data.map((topic) => (
                <Col key={topic._id} xl={2}>
                  <div className={cx('card')} style={{ background: topic.background }}>
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
