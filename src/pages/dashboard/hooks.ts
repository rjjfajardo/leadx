import { useEffect } from 'react';

import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { getDecimal } from '@/lib/decimal';

export const useHooks = () => {
  const { setBreadcrumbItems } = useBreadcrumb();

  const totalSales = getDecimal(3000);
  const missedSales = getDecimal(3000);

  useEffect(() => {
    setBreadcrumbItems([{ title: 'Dashboard' }]);
  }, []);

  return { totalSales, missedSales };
};
