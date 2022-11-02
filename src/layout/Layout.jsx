import { Header } from '../shared';
import { DarkModeToggle } from './DarkModeToggle';
import { LanguajeSelect } from './LanguajeSelect';

export const Layout = ({ children }) => {
  return (
    <div className='relative'>
      <Header />
      <DarkModeToggle />
      <LanguajeSelect />
      <div className='p-8 flex-1 min-h-screen bg-slate-100  dark:bg-slate-900 text-slate-900 dark:text-white duration-200'>
        {children}
      </div>
    </div>
  );
};