import type { AlertColor } from '@mui/material/Alert';
import type { SnackbarProps } from '@mui/material/Snackbar';
import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store/store';

export type SnackProps = Pick<
  SnackbarProps,
  'open' | 'message' | 'autoHideDuration' | 'action' | 'anchorOrigin'
> & {
  severity?: AlertColor;
};

const initialState: {
  snackbarProps: SnackProps;
} = {
  snackbarProps: {},
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackbarProps: (state, { payload }: { payload: SnackProps }) => {
      state.snackbarProps = payload;
    },
  },
});

export const selectSnackbarProps = (state: RootState) =>
  state.snackbar.snackbarProps;

export const { setSnackbarProps } = snackbarSlice.actions;

export default snackbarSlice.reducer;
