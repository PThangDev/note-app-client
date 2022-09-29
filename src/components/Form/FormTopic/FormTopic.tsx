import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faFloppyDisk, faHeading } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { ChangeEvent, FC, useState } from 'react';
import ColorPicker from 'src/components/ColorPicker';

import { Button, Input } from 'src/themes/UI';
import { backgrounds } from 'src/utils';
import styles from './FormTopic.module.scss';

interface Props {
  onClose?: () => void;
}

const cx = classnames.bind(styles);

const FormTopic: FC<Props> = ({ onClose }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [background, setBackground] = useState<string>(backgrounds[0]);

  const handleChangeColorPicker = (newColor: string) => {
    setBackground(newColor);
  };

  const handleChangeInputName = (e: ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value;
    setName(nameValue);
  };
  const handleChangeInputDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const descriptionValue = e.target.value;
    setDescription(descriptionValue);
  };

  const handleCloseForm = () => {
    if (!onClose) return;

    onClose();
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h3>Create Topic</h3>
      </div>
      <form action="">
        <Input
          icon={<FontAwesomeIcon icon={faHeading} />}
          placeholder="Name topic"
          onChange={handleChangeInputName}
        />
        <div className={cx('groups')}>
          <div className={cx('groups-left')}>
            <div className={cx('label')}>Colors:</div>
            <ColorPicker color="blue" onChange={handleChangeColorPicker} />
          </div>
          <div className={cx('groups-right')}>
            <div className={cx('label')}>Description :</div>
            <textarea
              className={cx('description')}
              onChange={handleChangeInputDescription}
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
          <Button icon={<FontAwesomeIcon icon={faFloppyDisk} />}>Save</Button>
        </div>
      </form>
    </div>
  );
};

export default FormTopic;
