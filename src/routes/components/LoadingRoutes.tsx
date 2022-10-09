import { FC, ReactNode, useEffect, useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

interface Props {
  children: ReactNode;
}

TopBarProgress.config({
  barThickness: 4,
  barColors: {
    0: 'rgb(245, 67, 54)',
    0.2: '#d35400',
    0.5: '#e67e22',
    1: '#f1c40f',
  },
});

const LoadingRoutes: FC<Props> = ({ children }) => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState('');
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [prevLoc]);

  return (
    <>
      {progress && <TopBarProgress />}
      <Routes>{children}</Routes>
    </>
  );
};

export default LoadingRoutes;
