import { values } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/api';
import {
  clearErrorMessage,
  onChecking,
  onLogin,
} from '../store/slices/clientSlice';

export const useClientStore = () => {
  const { status, client, msg } = useSelector((state) => state.client);
  const dispatch = useDispatch();

  const startCreate = async (expireAt) => {
    dispatch(onChecking());
    try {
      const { data } = await api.get(`api/validateLink/expireAt/${expireAt}`);

      console.log(data);
      if (data.error) {
        await startLogout(data.error);
        return;
      }
      localStorage.setItem('expireAt', expireAt);
      dispatch(
        onLogin({
          name: '',
          email: '',
          phoneNumber: '',
          documentId: '',
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = async (client = {}) => {
    dispatch(onLogin(values));
    localStorage.setItem('client', values);
  };

  const checkToken = async () => {
    //todo Se verifica el Token

    const expireAt = localStorage.getItem('expireAt');
    const client = localStorage.getItem('client');

    if (!expireAt) {
      await startLogout();
      return;
    } else {
      try {
        const { data } = await api.get(`api/validateLink/expireAt/${expireAt}`);
        if (data.error) {
          startLogout();
          return;
        }
        dispatch(onLogin(client));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const startLogout = async (errorMessage) => {
    localStorage.removeItem('expireAt');
    localStorage.removeItem('client');
    dispatch(onLogout({ errorMessage }));
    setTimeout(() => {
      dispatch(clearErrorMessage());
    }, 10);
  };

  return {
    //*Props
    status,
    client,
    msg,

    //*Methods
    startCreate,
  };
};
