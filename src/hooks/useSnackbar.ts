import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectSnackbarProps,
  setSnackbarProps as dispatchSnackbarProps,
  SnackProps,
} from '@/store/slice/snackbarSlice';

export const useSnackbar = () => {
  const dispatch = useDispatch();
  const snackbarProps = useSelector(selectSnackbarProps);

  const setSnackbar = useCallback(
    (props: SnackProps) => {
      const snackbarProps: SnackProps = {
        autoHideDuration: 3000,
        ...props,
      };
      dispatch(dispatchSnackbarProps(snackbarProps));
    },
    [dispatch],
  );

  return {
    snackbarProps,
    setSnackbar,
  };
};
