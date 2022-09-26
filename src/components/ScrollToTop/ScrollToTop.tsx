import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { FC, useCallback, useEffect, useState } from 'react';

import styles from './ScrollToTop.module.scss';

interface Props {}

const cx = classnames.bind(styles);

const ScrollToTop: FC<Props> = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleToggleVisible = useCallback(() => {
    const scrolledValue = document.documentElement.scrollTop;
    setIsVisible(scrolledValue > 300);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleToggleVisible);

    return () => window.removeEventListener('scroll', handleToggleVisible);
  }, [handleToggleVisible]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return <FontAwesomeIcon className={cx('icon')} icon={faCircleUp} onClick={handleScrollToTop} />;
};

export default ScrollToTop;
