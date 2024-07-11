import { createSlice } from '@reduxjs/toolkit';

export const isLoggedInSlice = createSlice({
  name: 'isLoggedIn',
  initialState: { value: false },
  reducers: {
    setIsLoggedIn: (
      state,
      { payload: { value } }: { payload: { value: boolean } },
    ) => {
      state.value = value;
    },
  },
});

export const { setIsLoggedIn } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer;
