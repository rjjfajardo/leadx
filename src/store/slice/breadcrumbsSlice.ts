import { createSlice } from '@reduxjs/toolkit';

import { BreadcrumbType } from '@/components/parts/Breadcrumbs';
import { RootState } from '@/store/store';

const initialState: {
  breadcrumbItems: BreadcrumbType[];
} = {
  breadcrumbItems: [],
};

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    setBreadcrumbItems: (state, { payload }: { payload: BreadcrumbType[] }) => {
      state.breadcrumbItems = payload;
    },
  },
});

export const selectBreadcrumbItems = (state: RootState) =>
  state.breadcrumb.breadcrumbItems;

export const { setBreadcrumbItems } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;
