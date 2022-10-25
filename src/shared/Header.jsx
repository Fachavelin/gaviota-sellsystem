export const Header = () => {
  return (
    <div className='bg-azul w-full h-20'>
      <div className='max-w-7xl mx-auto flex items-center'>
        <img
          className='object-cover object-center h-16 w-40 mt-2 ml-7'
          src='/images/DSD_logo-min.png'
          alt=''
        />
      </div>
      <p>Datos del comprador</p>
      <button>Continuar</button>
    </div>
  );
};
