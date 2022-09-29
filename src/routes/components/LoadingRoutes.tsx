import { FC, ReactNode, useEffect, useState } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

interface Props {
  children: ReactNode;
}

TopBarProgress.config({
  barThickness: 4,
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
      //thanks to ankit sahu
    }
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
