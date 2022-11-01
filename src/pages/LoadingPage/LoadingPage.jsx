export const LoadingPage = () => {
  return (
    <div className='h-screen bg-azul flex justify-center items-center '>
      <div className='text-white'>
        <p className='text-center text-3xl'>
          <i className='ml-3 fa-solid fa-spinner animate-spin'></i>
        </p>
        <p className='text-xl'>Cargando</p>
      </div>
    </div>
  );
};
