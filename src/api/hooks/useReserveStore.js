import { useDispatch, useSelector } from 'react-redux';

import { api } from '../';
import { onEdit } from '../../store/slices/reserveSlice';

export const useReserveStore = () => {
  const { loading, reserve, msg } = useSelector((state) => state.reserve);
  const dispatch = useDispatch();

  const startAdd = (res = []) => {
    dispatch(onEdit(res));
  };

  return {
    //*Props
    loading,
    reserve,
    msg,

    //*Methods
  };
};
