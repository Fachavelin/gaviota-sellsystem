import { useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { useClientStore } from '../hooks/useClientStore';
import { Layout } from '../layout';
import { LoadingPage } from '../pages/LoadingPage/LoadingPage';
import { ThankPages } from '../pages/ThankPage/ThankPages';
import { HandleParams } from './HandleParams';
import { PagesRouter } from './PagesRouter';

export const AppRouter = () => {
  const { status: authStatus, msg, checkToken } = useClientStore();

  useEffect(() => {
    checkToken();
  }, []);

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
        <Route path='/' element={<ThankPages />} />
      )}

      <Route path='/*' element={<Navigate to={'/'} />} />
    </Routes>
  );
};
