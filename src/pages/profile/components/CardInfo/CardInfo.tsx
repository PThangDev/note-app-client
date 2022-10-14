import classnames from 'classnames/bind';
import { CSSProperties, FC, ReactNode } from 'react';
import { Link, To } from 'react-router-dom';

import styles from './CardInfo.module.scss';

interface Props {
  title?: string;
  content?: ReactNode;
  style?: CSSProperties;
  icon?: JSX.Element;
  background?: string;
  color?: string;
  to?: To;
}

const cx = classnames.bind(styles);

const CardInfo: FC<Props> = ({ title, content, to, style, icon, background, color }) => {
  const renderMain = () => (
    <>
      <div className={cx('main')}>
        <div className={cx('header')}>
          <h3>{title}</h3>
        </div>
        <p className={cx('content')}>{content}</p>
      </div>
      {icon}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cx('wrapper')} style={{ background, color, ...style }}>
        {renderMain()}
      </Link>
    );
  }

  return (
    <div className={cx('wrapper')} style={{ background, color, ...style }}>
      {renderMain()}
    </div>
  );
};

export default CardInfo;
