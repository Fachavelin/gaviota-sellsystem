import { Navigate, Route, Routes } from 'react-router-dom';
import { useClientStore } from '../hooks/useClientStore';
import { Layout } from '../layout';
import { ThankPages } from '../pages/ThankPage/ThankPages';
import { PagesRouter } from './PagesRouter';

export const AppRouter = () => {
  const { status: authStatus, msg } = useClientStore();

  if (authStatus === 'checking') {
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
  }

  return (
    <Layout>
      <Routes>
        {authStatus === 'authenticated' ? (
          <Route path='/*' element={<PagesRouter />} />
        ) : (
          <Route path='/finalizado' element={<ThankPages />} />
        )}
        <Route path='/*' element={<Navigate to={'/finalizado'} />} />
      </Routes>
    </Layout>
  );
};
