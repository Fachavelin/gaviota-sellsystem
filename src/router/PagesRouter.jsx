import { useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { useClientStore } from '../hooks';
import { IndexPage, ReservePage } from '../pages';

export const PagesRouter = () => {
  // const { '*': data } = useParams();
  /* const { expireAt } = useParams(); */

  const { startCreate, checkToken } = useClientStore();

  /* useEffect(() => {
    console.log(expireAt);
  }, []);
 */
  return (
    <>
      {/* <div className='mt-16 mb-3 mx-auto max-w-7xl text-white'>
        <div className='flex justify-center items-center gap-1'>
          <div
            className={`rounded-2xl px-5 py-4  ${
              data >= 1 ? 'bg-blue-500' : 'bg-blue-200'
            } duration-300`}
          >
            <i className='fa-solid fa-user'></i>
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
            <i className='fa-solid fa-calendar'></i>
          </div>
          <div
            className={`h-1 w-20  ${
              data >= 3 ? 'bg-blue-500' : 'bg-blue-200'
            } duration-300`}
          ></div>

          <div
            className={`rounded-2xl px-5 py-4  ${
              data >= 3 ? 'bg-blue-500' : 'bg-blue-200'
            } duration-300`}
          >
            <i className='fa-solid fa-money-bill'></i>
          </div>
        </div>
      </div> */}
      <Routes>
        <Route path='/1' element={<IndexPage />} />
        <Route path='/2' element={<ReservePage />} />
        <Route path='/*' element={<Navigate to='/reservas/1' />} />
      </Routes>
    </>
  );
};
