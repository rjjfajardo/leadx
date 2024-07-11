import { useCallback } from 'react';

import { ACCESS_TYPE } from '@/constants/accessControl';
import { useResources } from '@/hooks/api/roles';
import { useAuth } from '@/hooks/api/useAuth';
import { LoginUser, RoleForUser } from '@/store/api/gen/auth';
import {
  AccessType,
  ResourceEntity,
  ResourceType,
} from '@/store/api/gen/roles';

export type RequiredResource = {
  type: ResourceType;
  accessTypes: AccessType[];
};

type CheckAccess = {
  user: LoginUser | undefined;
  requiredResources: RequiredResource[];
  resources?: ResourceEntity[];
};

type CheckAccessReturn = {
  grant: boolean;
};

type CheckUserRoleArgs = {
  roleNameToCheck: string;
  user: LoginUser | undefined;
};

export const useAccessControl = () => {
  const { user, isLoading: isUseAuthLoading } = useAuth();

  const { resources, isLoading: isResourcesLoading } = useResources();

  const checkAccess = useCallback(
    (requiredResources: RequiredResource[]): CheckAccessReturn => {
      return _internalCheckAccess({
        requiredResources,
        user,
        resources,
      });
    },
    [user, resources],
  );

  const hasUserRole = useCallback(
    (roleNameToCheck: string): boolean => {
      return _internalUserRoleCheck({ roleNameToCheck, user });
    },
    [user],
  );

  return {
    isLoading: isUseAuthLoading || isResourcesLoading,
    checkAccess,
    hasUserRole,
  };
};

const _internalCheckAccess = ({
  user,
  requiredResources,
  resources,
}: CheckAccess): CheckAccessReturn => {
  if (!user || !user.roles || !resources) {
    return { grant: false };
  }

  const grant = requiredResources.every((resourceToCheck) => {
    const hasPermission = user.roles.some((role: RoleForUser) => {
      const hasResourcePermission = role.permission.resourcePermissions.some(
        (userResourcePermission) => {
          const typeMatch =
            resourceToCheck.type === userResourcePermission.type ||
            userResourcePermission.type === 'ALL';

          const accessMatch = _checkAccessTypes(
            userResourcePermission.accessTypes,
            resourceToCheck,
          );

          return typeMatch && accessMatch;
        },
      );

      return hasResourcePermission;
    });

    return hasPermission;
  });

  return {
    grant,
  };
};

const _checkAccessTypes = (
  accessTypes: AccessType[],
  resource: RequiredResource,
): boolean => {
  return accessTypes.some(
    (type) => resource.accessTypes.includes(type) || type === ACCESS_TYPE.ALL,
  );
};

export const _internalUserRoleCheck = ({
  user,
  roleNameToCheck,
}: CheckUserRoleArgs) => {
  if (!user || !user.roles) return false;

  return user.roles.some((role) => role.name === roleNameToCheck);
};
