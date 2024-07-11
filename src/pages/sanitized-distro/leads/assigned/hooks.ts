import { useEffect } from 'react';

import { useBreadcrumb } from '@/hooks/useBreadcrumb';

export const useHooks = () => {
  const { setBreadcrumbItems } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumbItems([{ title: 'My Assigned Leads' }]);
  }, []);
};
