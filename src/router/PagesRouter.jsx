import { useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { useClientStore } from '../hooks';
import { Layout } from '../layout';
import { IndexPage, ReservePage } from '../pages';
import { PaymentPage } from '../pages/PaymentPage/PaymentPage';

export const PagesRouter = () => {
  const { '*': data } = useParams();

  return (
    <Layout>
      <div className='mx-auto max-w-screen-2xl text-white'>
        {/* <div className='flex justify-center items-center gap-1'>
          <div
            className={`rounded-2xl px-5 py-4  ${
              data >= 1 ? 'bg-blue-500' : 'bg-blue-200'
            } duration-300`}
          >
            <i className='fa-solid fa-calendar'></i>
          </div>
          <div
            className={`h-1 w-20  ${
              data >= 2 ? 'bg-blue-500' : 'bg-blue-200'
            } duration-300`}
          ></div>

          <div
            className={`rounded-2xl px-5 py-4  ${
              data >= 2 ? 'bg-blue-500' : 'bg-blue-200'
            } duration-300`}
          >
            <i className='fa-solid fa-money-bill'></i>
          </div>
        </div> */}
      </div>
      <Routes>
        <Route path='/1' element={<IndexPage />} />
        {/* <Route path='/1' element={<ReservePage />} />
        <Route path='/2' element={<PaymentPage />} /> */}
        <Route path='/*' element={<Navigate to='/reservas/1' />} />
      </Routes>
    </Layout>
  );
};
