import { values } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { onLoading } from '../store/slices/clientSlice';

export const useClientStore = () => {
  const { loading, client, msg } = useSelector((state) => state.client);
  const dispatch = useDispatch();

  const startCreate = (values = {}) => {
    dispatch(onLoading());
  };

  const checkToken = (values = {}) => {
    //todo Se verifica el Token
  };

  return {
    //*Props
    loading,
    client,
    msg,

    //*Methods
    startCreate,
  };
};
