import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { api } from '../';
import { useClientStore } from '../../hooks';
import { onEdit, onLoading, onFinished, clearMsg } from '../../store/slices/reserveSlice';
import axios from 'axios';

export const useReserveStore = () => {
  const { loading, reserve, msg } = useSelector((state) => state.reserve);
  const dispatch = useDispatch();

  const { t } = useTranslation();

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
      console.log(data);
      startLogout(t(`Tu reserva fue agregada de manera éxitosa`) + `: N°${data.succes.substring(0, 6).toUpperCase()}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.message);
      }
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
