import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC } from 'react';
import { HexAlphaColorPicker } from 'react-colorful';

import backgrounds from './backgrounds';
import styles from './ColorPicker.module.scss';

interface Props {
  attrs?: any;
  color: string;
  onChange: (newColor: string) => void;
}

const cx = classnames.bind(styles);

const ColorPicker: FC<Props> = ({ color, attrs, onChange }) => {
  return (
    <div className={cx('wrapper')} tabIndex={-1} {...attrs}>
      <HexAlphaColorPicker className={cx('color-table')} color={color} onChange={onChange} />
      <div className={cx('options')}>
        {backgrounds.map((bg, index) => (
          <p
            className={cx('color', { active: bg === color })}
            key={bg}
            style={{ background: bg }}
            onClick={() => onChange(bg)}
          >
            <span className={cx('icon')}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
