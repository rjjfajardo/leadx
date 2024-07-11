import { useEffect, useState } from 'react';

import { useBreadcrumb } from '@/hooks/useBreadcrumb';

export const useHooks = () => {
  const { setBreadcrumbItems } = useBreadcrumb();

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setBreadcrumbItems([{ title: 'Sanitized Leads' }]);
  }, []);

  return {
    openDialog,
    setOpenDialog,
  };
};
