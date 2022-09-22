import { faHeading } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import MDEditor from '@uiw/react-md-editor';
import classnames from 'classnames/bind';
import { ChangeEvent, FC, useState } from 'react';

import { useAppDispatch } from 'src/app/hooks';
import ColorPicker from 'src/components/ColorPicker';
import backgrounds from 'src/components/ColorPicker/backgrounds';
import { fetchCreateNote } from 'src/pages/notes/notesSlice';
import { Button, Input } from 'src/themes/UI';
import { Note } from 'src/types';
import TopicBox from '../TopicBox';
import styles from './FormNote.module.scss';

interface Props {
  onClose: () => void;
  data?: Note;
}

const cx = classnames.bind(styles);

const FormNote: FC<Props> = ({ data, onClose }) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>(data?.title || '');
  const [content, setContent] = useState<string>(data?.content || '');
  const [backgroundColor, setBackgroundColor] = useState(data?.background || backgrounds[0]);
  const [topicIds, setTopicIds] = useState<string[]>([]);

  const handleChangeInputTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const titleValue = e.target.value;
    setTitle(titleValue);
  };

  const handleChangeColorInput = (e: ChangeEvent<HTMLInputElement>) => {
    const backgroundValue = e.target.value;
    setBackgroundColor(backgroundValue);
  };

  const handleSubmitNote = async () => {
    await dispatch(
      fetchCreateNote({ title, content, background: backgroundColor, topics: [] })
    ).unwrap();
    onClose();
  };

  return (
    <div className={cx('wrapper')}>
      <h3 className={cx('heading')}>Create Note</h3>
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
          <MDEditor
            height={300}
            value={content}
            onChange={(value?: string) => setContent(value as string)}
          />
        </div>
        <div className={cx('background')}>
          <h3 className={cx('background-heading')}>Choose background card :</h3>
          <div className={cx('color-field')}>
            <HeadlessTippy
              interactive
              placement="bottom-start"
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
                <input value={backgroundColor} type="text" onChange={handleChangeColorInput} />
                <p className={cx('line')} style={{ background: backgroundColor }}></p>
              </div>
            </HeadlessTippy>
          </div>
        </div>

        <div className={cx('topics')}>
          <h3 className={cx('topics-heading')}>
            Topics
            {/* <ButtonCreate className={cx('button-create-topic')} text="Add topic" /> */}
          </h3>

          <div className={cx('topic-group')}>
            <TopicBox />
          </div>
        </div>

        <div className={cx('actions')}>
          <Button status="error" type="default" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmitNote}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default FormNote;
