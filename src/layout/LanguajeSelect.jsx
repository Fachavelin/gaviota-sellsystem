import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguajeSelect = () => {
  const { i18n } = useTranslation();

  const handleSelect = (e) => {
    i18n.changeLanguage(e.target.value);
    console.log(i18n.language);
  };

  useEffect(() => {
    console.log(i18n.language);
  }, []);

  return (
    <form
      className='absolute right-0 mt-10 mr-2 rounded-md'
      onChange={handleSelect}
    >
      <select
        className='py-1 dark:bg-slate-800 dark:text-white border dark:border-slate-700 rounded-md px-1'
        name=''
        id=''
      >
        <option value={'es-ES'}>Es</option>
        <option value={'en-US'}>En</option>
      </select>
    </form>
  );
};
