import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { ChangeEvent, FC } from 'react';
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
    <div className={cx('wrapper')}>
      <div className={cx('color-input')}>
        <input
          value={color}
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value as string)}
        />
        <p className={cx('line')} style={{ background: color }}></p>
      </div>

      <div className={cx('color-table')} tabIndex={-1} {...attrs}>
        <HexAlphaColorPicker className={cx('react-colorful')} color={color} onChange={onChange} />
        <div className={cx('color-options')}>
          {backgrounds.map((bg) => (
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
    </div>
  );
};

export default ColorPicker;
