import { faAngleLeft, faHeading } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-grid-system';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'src/app/hooks';
import CardNote from 'src/components/CardNote';
import ColorPicker from 'src/components/ColorPicker';
import backgrounds from 'src/components/ColorPicker/backgrounds';
import useDebounce from 'src/hooks/useDebounce';
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

  const [title, setTitle] = useState<string>(data?.title || '');
  const [content, setContent] = useState<string>(data?.content || '');
  const [backgroundColor, setBackgroundColor] = useState(data?.background || backgrounds[0]);

  const titleDebounced = useDebounce(title, 300);
  const contentDebounced = useDebounce(content, 300);
  const backgroundColorDebounced = useDebounce(backgroundColor, 300);

  const notesPreview = useMemo(() => {
    return {
      content: contentDebounced,
      background: backgroundColorDebounced,
      title: titleDebounced,
    };
  }, [backgroundColorDebounced, contentDebounced, titleDebounced]);

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
    navigate(-1);
  };

  const handleChangeInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
  };

  const handleChangeContent = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleChangeColorInput = (newColor: string) => {
    setBackgroundColor(newColor);
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
        <button className={cx('btn-go-back')} onClick={handleGoBack}>
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

        <div className={cx('groups')}>
          <Container fluid style={{ padding: 0 }}>
            <Row nogutter>
              <Col xl={6}>
                <div className={cx('groups-left')}>
                  <div className={cx('card-preview')}>
                    <CardNote className={cx('card')} readOnly note={notesPreview} />
                  </div>
                  <div className={cx('color-picker')}>
                    <ColorPicker color={backgroundColor} onChange={handleChangeColorInput} />
                  </div>
                </div>
              </Col>
              <Col xl={6}>
                <div className={cx('groups-right')}>
                  <TopicSelect topics={topics} onChangeTopicSelect={handleChangeTopic} />
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
