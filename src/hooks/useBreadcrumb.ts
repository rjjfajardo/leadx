import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BreadcrumbType } from '@/components/parts/Breadcrumbs';
import {
  selectBreadcrumbItems,
  setBreadcrumbItems as dispatchBreadcrumbItems,
} from '@/store/slice/breadcrumbsSlice';

export const useBreadcrumb = () => {
  const dispatch = useDispatch();
  const breadcrumbItems = useSelector(selectBreadcrumbItems);

  const setBreadcrumbItems = useCallback(
    (breadcrumbItems: BreadcrumbType[]) => {
      dispatch(dispatchBreadcrumbItems(breadcrumbItems));
    },
    [dispatch],
  );

  return {
    breadcrumbItems,
    setBreadcrumbItems,
  };
};
