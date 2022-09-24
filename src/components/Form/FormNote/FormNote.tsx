import { faAngleLeft, faHeading } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classnames from 'classnames/bind';
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'src/app/hooks';
import ColorPicker from 'src/components/ColorPicker';
import backgrounds from 'src/components/ColorPicker/backgrounds';
import { fetchCreateNote, fetchUpdateNote } from 'src/pages/notes/notesSlice';
import { Button, Input } from 'src/themes/UI';
import { BaseTopic, Note } from 'src/types';
import TopicSelect from '../TopicSelect';
import styles from './FormNote.module.scss';
import MDEditor from './MDEditor';

interface Props {
  onClose?: () => void;
  data?: Note;
}

const cx = classnames.bind(styles);

const FormNote: FC<Props> = ({ data, onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState<string>(data?.title || '');
  const [content, setContent] = useState<string>(data?.content || '');
  const [backgroundColor, setBackgroundColor] = useState(data?.background || backgrounds[0]);
  const [topics, setTopics] = useState<BaseTopic[]>(() => {
    if (data) {
      return data.topics.map((topic) => ({
        _id: topic._id,
        name: topic.name,
        background: topic.background,
      }));
    }
    return [];
  });

  const topicIds = useMemo(() => {
    return topics.map((topic) => topic._id);
  }, [topics]);

  const handleGoBack = () => {
    if (location.state?.previousPage) {
      navigate(location.state.previousPage, { state: { reload: false } });
    } else {
      navigate(-1);
    }
  };

  const handleChangeInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
  };

  const handleChangeContent = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleChangeColorInput = (e: ChangeEvent<HTMLInputElement>) => {
    const backgroundValue = e.target.value;
    setBackgroundColor(backgroundValue);
  };
  const handleChangeTopic = useCallback((topic: BaseTopic) => {
    setTopics((prevTopics) => {
      if (!!prevTopics.find((tp) => tp._id === topic._id)) {
        return prevTopics.filter((tp) => tp._id !== topic._id);
      }
      return [...prevTopics, topic];
    });
  }, []);

  const handleSubmitNote = async () => {
    if (data) {
      await dispatch(
        fetchUpdateNote({
          id: data._id,
          title,
          content,
          background: backgroundColor,
          topics: topicIds,
        })
      ).unwrap();
    } else {
      await dispatch(
        fetchCreateNote({ title, content, background: backgroundColor, topics: topicIds })
      ).unwrap();
    }
    handleGoBack();
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <button onClick={handleGoBack}>
          <FontAwesomeIcon className={cx('icon')} icon={faAngleLeft} />
          Back
        </button>
        <h3 className={cx('heading')}>{data ? 'Update Note' : 'Create Note'}</h3>
      </div>
      <div className={cx('form')}>
        <Input
          className={cx('title')}
          value={title}
          name="title"
          placeholder="Your title..."
          onChange={handleChangeInputTitle}
          icon={<FontAwesomeIcon icon={faHeading} />}
        />
        <div className={cx('editor')} data-color-mode="dark">
          <MDEditor value={content} onChange={handleChangeContent} />
        </div>

        <div className={cx('topics')}>
          <Container fluid style={{ padding: 0 }}>
            <Row nogutter>
              <Col xl={6}>
                <div className={cx('topic-group')}>
                  <TopicSelect topics={topics} onChangeTopicSelect={handleChangeTopic} />
                </div>
              </Col>
              <Col xl={6}>
                <div className={cx('background')}>
                  <h3 className={cx('background-heading')}>Choose background card :</h3>
                  <div className={cx('color-field')}>
                    <HeadlessTippy
                      interactive
                      placement="right-end"
                      delay={[300, 500]}
                      hideOnClick={false}
                      render={(attrs) => (
                        <ColorPicker
                          color={backgroundColor}
                          onChange={(newColor) => setBackgroundColor(newColor)}
                          attrs={attrs}
                        />
                      )}
                    >
                      <div className={cx('color-input')}>
                        <input
                          value={backgroundColor}
                          type="text"
                          onChange={handleChangeColorInput}
                        />
                        <p className={cx('line')} style={{ background: backgroundColor }}></p>
                      </div>
                    </HeadlessTippy>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className={cx('actions')}>
          <Button status="error" type="default" onClick={handleGoBack}>
            Cancel
          </Button>
          <Button onClick={handleSubmitNote}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default FormNote;
