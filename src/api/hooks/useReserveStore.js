import { useDispatch, useSelector } from 'react-redux';

import { api } from '../';
import { useClientStore } from '../../hooks';
import {
  onEdit,
  onLoading,
  onFinished,
  clearMsg,
} from '../../store/slices/reserveSlice';

export const useReserveStore = () => {
  const { loading, reserve, msg } = useSelector((state) => state.reserve);
  const dispatch = useDispatch();

  const { startLogout } = useClientStore();

  const startAdd = (res = []) => {
    dispatch(onEdit(res));
  };

  const startCreate = async (res = []) => {
    dispatch(onLoading());

    try {
      const { data } = await api.post('api/addReservesExternal', res);
      console.log(data);

      if (data.error) {
        dispatch(onFinished(data));
        clearMessage();
        return;
      }
      dispatch(onFinished(data));
      startLogout();
    } catch (error) {
      console.log(error);
    }
  };

  const clearMessage = () => {
    setTimeout(() => {
      dispatch(clearMsg());
    }, 10);
  };

  return {
    //*Props
    loading,
    reserve,
    msg,

    //*Methods
    startAdd,
    startCreate,
    clearMessage,
  };
};
