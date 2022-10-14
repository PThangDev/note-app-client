import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faFloppyDisk, faHeading } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { ChangeEvent, FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'src/app/hooks';
import ColorPicker from 'src/components/ColorPicker';
import { fetchCreateTopic, fetchUpdateTopic } from 'src/pages/topics/topicsSlice';

import { Button, Input } from 'src/themes/UI';
import { Topic } from 'src/types';
import { backgrounds } from 'src/utils';
import styles from './FormTopic.module.scss';

interface Props {
  onClose?: () => void;
  topic?: Topic;
}

const cx = classnames.bind(styles);

const FormTopic: FC<Props> = ({ topic, onClose }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>(topic?.name || '');
  const [description, setDescription] = useState<string>(topic?.description || '');
  const [background, setBackground] = useState<string>(topic?.background || backgrounds[0]);

  const handleChangeColorPicker = (newColor: string) => {
    setBackground(newColor);
  };

  const handleCloseForm = useCallback(() => {
    if (!onClose) return;

    onClose();
  }, [onClose]);

  const handleChangeInputName = (e: ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setName(nameValue);
  };
  const handleChangeInputDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const descriptionValue = e.target.value;
    setDescription(descriptionValue);
  };

  const handleSubmitTopic = useCallback(async () => {
    if (topic) {
      await dispatch(
        fetchUpdateTopic({ id: topic._id, data: { name, background, description } })
      ).unwrap();
    } else {
      await dispatch(fetchCreateTopic({ name, background, description })).unwrap();
    }

    handleCloseForm();
  }, [background, description, dispatch, handleCloseForm, name, topic]);

  const handleSubmitForm = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      handleSubmitTopic();
    },
    [handleSubmitTopic]
  );

  // Handle event ctrl + s
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.code === 'KeyS') {
        e.preventDefault();
        handleSubmitTopic();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmitTopic]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h3>{topic ? 'Update Topic' : 'Create Topic'}</h3>
      </div>
      <form action="" onSubmit={handleSubmitForm}>
        <Input
          icon={<FontAwesomeIcon icon={faHeading} />}
          placeholder="Name topic"
          name="name"
          value={name}
          onChange={handleChangeInputName}
          autoFocus
        />
        <div className={cx('groups')}>
          <div className={cx('groups-left')}>
            <div className={cx('label')}>Colors:</div>
            <ColorPicker color={background} onChange={handleChangeColorPicker} />
          </div>
          <div className={cx('groups-right')}>
            <div className={cx('label')}>Description :</div>
            <textarea
              className={cx('description')}
              onChange={handleChangeInputDescription}
              spellCheck={false}
              value={description}
            ></textarea>
          </div>
        </div>
        <div className={cx('actions')}>
          <Button
            status="error"
            icon={<FontAwesomeIcon icon={faCircleXmark} />}
            onClick={handleCloseForm}
          >
            Cancel
          </Button>
          <Button type="submit" icon={<FontAwesomeIcon icon={faFloppyDisk} />}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormTopic;
