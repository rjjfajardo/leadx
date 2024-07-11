import { useMemo } from 'react';

import companyApi from '@/store/api/enhancedApi/companies';

export const useCompanies = () => {
  const { data } = companyApi.useCompaniesControllerFindAllQuery();

  const companies = useMemo(() => data?.data || [], [data]);

  return {
    companies,
  };
};
