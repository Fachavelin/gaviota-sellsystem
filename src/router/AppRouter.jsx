import { Navigate, Route, Routes } from 'react-router-dom';
import { useClientStore } from '../hooks/useClientStore';
import { Layout } from '../layout';
import { IndexPage } from '../pages';

export const AppRouter = () => {
  const { loading, msg } = useClientStore();

  if (loading === true) {
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
        <Route path='/*' element={<IndexPage />} />
      </Routes>
    </Layout>
  );
};
