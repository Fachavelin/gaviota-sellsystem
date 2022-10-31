import { values } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin } from '../store/slices/clientSlice';

export const useClientStore = () => {
  const { status, client, msg } = useSelector((state) => state.client);
  const dispatch = useDispatch();

  const startCreate = (values = {}) => {
    dispatch(onLogin(values));
  };

  const checkToken = (values = {}) => {
    //todo Se verifica el Token
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
