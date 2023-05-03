import { useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { customSwal } from '../helpers';
import { useClientStore } from '../hooks/useClientStore';
import { Layout } from '../layout';
import { LoadingPage } from '../pages/LoadingPage/LoadingPage';
import { ThankPages } from '../pages/ThankPage/ThankPages';
import { HandleParams } from './HandleParams';
import { PagesRouter } from './PagesRouter';

export const AppRouter = () => {
  const { status: authStatus, errorMessage, checkToken, clearMessage } = useClientStore();

  //!cambiar estado para version sin tocken
  //!Tambien calmbiar en el client SLice
  /* useEffect(() => {
    checkToken();
  }, []); */

  const swal = customSwal();

  /*   if (errorMessage !== undefined) {
    swal.fire({
      icon: 'success',
      title: `${errorMessage}`,
    });

    // clearMessage();
  }
 */

  if (authStatus === 'checking') {
    return (
      <Routes>
        <Route path='/expireAt/:expireAt' element={<HandleParams />} />
      </Routes>
    );
  }
  return (
    <Routes>
      {authStatus === 'authenticated' ? (
        <Route path='/reservas/*' element={<PagesRouter />} />
      ) : (
        <Route path='/*' element={<ThankPages />} />
      )}

      <Route path='/*' element={<Navigate to={'/reservas/'} />} />
    </Routes>
  );
};
