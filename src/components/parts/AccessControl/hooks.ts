import { useMemo } from 'react';

import { AccessControlProps } from '@/components/parts/AccessControl';
import { useAccessControl } from '@/hooks/useAccessControl';
interface AccessControlUseHooksReturn {
  isLoading: boolean;
  grant: boolean;
}

type AccessControlUseHooksProps = Pick<AccessControlProps, 'requiredResources'>;

export type AccessControlUseHooks = (
  props: AccessControlUseHooksProps,
) => AccessControlUseHooksReturn;

export const useHooks: AccessControlUseHooks = ({ requiredResources }) => {
  const { checkAccess, isLoading } = useAccessControl();

  const { grant } = useMemo(
    () => checkAccess(requiredResources),
    [requiredResources, checkAccess],
  );

  return {
    isLoading,
    grant,
  };
};
