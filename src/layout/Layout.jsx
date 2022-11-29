import { Header } from '../shared';

export const Layout = ({ children }) => {
  return (
    <div className='relative'>
      <Header />

      <div className='flex-1 min-h-screen bg-slate-100  dark:bg-slate-900 text-slate-900 dark:text-white duration-200'>
        {children}
      </div>
    </div>
  );
};
