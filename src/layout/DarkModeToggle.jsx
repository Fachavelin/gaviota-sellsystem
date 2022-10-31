import { useDarkClass } from '../hooks';

export const DarkModeToggle = () => {
  const { dark, setDarkClass } = useDarkClass();

  return (
    <div className='absolute right-0 m-0.5 sm:m-2 rounded-md'>
      <button
        className=' text-white dark:text-slate-900 text-3xl px-1 duration-300'
        onClick={setDarkClass}
      >
        {dark ? (
          <i className='fa-solid fa-moon px-1 bg-slate-800 rounded-md'></i>
        ) : (
          <i className='fa-sharp fa-solid fa-lightbulb bg-slate-100 rounded-md px-1'></i>
        )}
      </button>
    </div>
  );
};
