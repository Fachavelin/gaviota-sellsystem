import { useState } from 'react';

export const useDarkClass = () => {
  if (
    localStorage.theme === 'dark' /* ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) */
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  const [dark, setDark] = useState(
    localStorage.theme === 'dark' ? false : true
  );

  const setDarkClass = (e) => {
    e.preventDefault();
    if (dark) {
      setDark(!dark);
      localStorage.theme = 'dark';
    } else {
      setDark(!dark);
      localStorage.theme = 'ligh';
    }
  };

  return {
    dark,
    setDarkClass,
  };
};
