import { useEffect, useState } from 'react';

import { Theme } from 'src/types';
import { storage } from 'src/utils';

type Props = {};

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const bodyElem = document.querySelector('body');
    if (!bodyElem) return;

    const theme = storage.get<Theme>('theme');

    if (theme === 'dark') {
      bodyElem.setAttribute('theme', 'dark-mode');
      setDarkMode(true);
    } else {
      bodyElem.setAttribute('theme', 'light-mode');
      setDarkMode(false);
    }
  }, []);

  const handleToggleTheme = () => {
    const bodyElem = document.querySelector('body');
    if (!bodyElem) return;

    setDarkMode(!darkMode);

    if (!darkMode) {
      bodyElem.setAttribute('theme', 'dark-mode');
      storage.set('theme', 'dark');
    } else {
      bodyElem.setAttribute('theme', 'light-mode');
      storage.set('theme', 'light');
    }
  };

  return { darkMode, onToggleTheme: handleToggleTheme };
};
export default useDarkMode;
