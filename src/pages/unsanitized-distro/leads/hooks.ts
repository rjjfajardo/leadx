import { useEffect, useState } from 'react';

import { useBreadcrumb } from '@/hooks/useBreadcrumb';

export const useHooks = () => {
  const { setBreadcrumbItems } = useBreadcrumb();

  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    setBreadcrumbItems([{ title: 'All Mined Leads' }]);
  }, []);

  return { showCreateForm, setShowCreateForm };
};
