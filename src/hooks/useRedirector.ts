import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { OFFICIAL_ROLE_NAMES } from '@/constants/roles';
import { whiteListedRoutes } from '@/constants/whiteListedRoutes';
import { _internalUserRoleCheck } from '@/hooks/useAccessControl';
import authApi from '@/store/api/enhancedApi/auth';

export const useRedirector = () => {
  const { pathname, replace } = useRouter();
  const { data, isLoading } = authApi.useAuthControllerMeQuery();

  useEffect(() => {
    if (!isLoading && !whiteListedRoutes.includes(pathname)) {
      if (data) {
        if (
          pathname === '/login' &&
          _internalUserRoleCheck({
            user: data.personnel,
            roleNameToCheck: OFFICIAL_ROLE_NAMES.LEAD_MINER,
          })
        ) {
          replace('/unsanitized-distro/leads');
        }

        if (
          pathname === '/login' &&
          _internalUserRoleCheck({
            user: data.personnel,
            roleNameToCheck: OFFICIAL_ROLE_NAMES.LEAD_VERIFIER,
          })
        ) {
          replace('/unsanitized-distro/leads/verification');
        }

        if (
          pathname === '/login' &&
          _internalUserRoleCheck({
            user: data.personnel,
            roleNameToCheck: OFFICIAL_ROLE_NAMES.LEAD_GEN_SUPERVISOR,
          })
        ) {
          replace('/sanitized-distro/leads');
        }

        if (
          pathname === '/login' &&
          _internalUserRoleCheck({
            user: data.personnel,
            roleNameToCheck: OFFICIAL_ROLE_NAMES.SALES_AGENT,
          })
        ) {
          replace('/sanitized-distro/leads/assigned');
        }
      } else {
        if (pathname !== '/login') {
          replace('/login');
        }
      }
    }
  }, [data, isLoading, pathname]);
};
