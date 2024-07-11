import { useEffect, useState } from 'react';

import { useBreadcrumb } from '@/hooks/useBreadcrumb';

export const useHooks = () => {
  const { setBreadcrumbItems } = useBreadcrumb();

  const [showAcquireLeadsDialog, setShowAcquireLeadsDialog] = useState(false);

  useEffect(() => {
    setBreadcrumbItems([{ title: 'Lead Verification' }]);
  }, []);

  return { showAcquireLeadsDialog, setShowAcquireLeadsDialog };
};
