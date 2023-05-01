import { Header } from '../shared';

export const Layout = ({ children }) => {
  return (
    <div className='relative'>
      <Header />

      <div className='flex-1 min-h-screen bg-slate-100  dark:bg-slate-900 text-slate-900 dark:text-white duration-200'>
        {children}
      </div>
      <div className='bg-azul w-full h-12 flex justify-center items-center text-white'>
        <p>
          Desarrollado por{' '}
          <a className='font-bold' href='https://www.logicielapplab.com/' target='_blank' rel='noreferrer'>
            Logiciel Applab
          </a>{' '}
          © | 2023
        </p>
      </div>
    </div>
  );
};
