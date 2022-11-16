import { useDispatch, useSelector } from 'react-redux';

import { api } from '../';
import { onEdit, onLoading } from '../../store/slices/reserveSlice';

export const useReserveStore = () => {
  const { loading, reserve, msg } = useSelector((state) => state.reserve);
  const dispatch = useDispatch();

  const startAdd = (res = []) => {
    dispatch(onEdit(res));
  };

  const startCreate = async (res = []) => {
    dispatch(onLoading());

    try {
      const { data } = await api.post('api/addReservesExternal', res);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //*Props
    loading,
    reserve,
    msg,

    //*Methods
    startAdd,
    startCreate,
  };
};
