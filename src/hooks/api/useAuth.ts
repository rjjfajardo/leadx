import { useMemo } from 'react';

import { logout as logoutFn, logoutProps } from '@/lib/logout';
import authApi from '@/store/api/enhancedApi/auth';
import { GetMeResponseDto, LoginUser } from '@/store/api/gen/auth';

export interface UseAuthArgs {
  queryOption?: {
    refetchOnMountOrArgChange?: boolean | number;
  };
}

export interface UseAuthResult {
  userAccount?: GetMeResponseDto;
  user?: LoginUser;
  isLoading: boolean;
}

export const useAuth = (args?: UseAuthArgs): UseAuthResult => {
  const { queryOption } = args || {};

  const { data: userAccount, isLoading } = authApi.useAuthControllerMeQuery(
    undefined,
    queryOption,
  );

  const user = useMemo(() => userAccount?.personnel, [userAccount]);

  return {
    userAccount,
    user,
    isLoading,
  };
};

interface UseLogoutResult {
  logout: (props: logoutProps) => Promise<void>;
}

export const useLogout = (): UseLogoutResult => {
  const [logoutMutation] = authApi.useAuthControllerLogoutMutation();

  const logout = async (props: logoutProps) => {
    await logoutMutation();
    logoutFn(props);
  };

  return {
    logout,
  };
};
