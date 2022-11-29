import { DarkModeToggle } from '../layout/DarkModeToggle';
import { LanguajeSelect } from '../layout/LanguajeSelect';

export const Header = () => {
  return (
    <div className='bg-azul w-full h-16'>
      <div className='max-w-7xl pt-2 pb-2 mx-auto flex justify-between items-center'>
        <img
          className='object-cover object-center h-12 w-32  ml-7'
          src='/images/login_icon.png'
          alt=''
        />
        <div className='grid grid-flow-col'>
          <DarkModeToggle />
          <LanguajeSelect />
        </div>
      </div>
    </div>
  );
};
