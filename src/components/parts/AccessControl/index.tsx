import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/material/styles';
import * as React from 'react';

import { useHooks } from '@/components/parts/AccessControl/hooks';
import { ResourcePermission } from '@/store/api/gen/auth';

export interface AccessControlProps {
  /**
   * A list of required resources.
   * @example
   * ```typescript
   *  {[{ type: 'JOBS', accessTypes: [ACCESS_TYPE.LIST, ACCESS_TYPE.CREATE] }]}
   * ```
   */
  requiredResources: ResourcePermission[];
  children: React.ReactNode;
  hideNoAccessTemplate?: boolean;
}

export const AccessControl = React.memo((props: AccessControlProps) => {
  const { hideNoAccessTemplate, requiredResources, children } = props;

  const { isLoading, grant } = useHooks({
    requiredResources,
  });

  if (isLoading) {
    return <></>;
  }

  if (!grant) {
    if (hideNoAccessTemplate) {
      return <></>;
    }

    return (
      <NoAccessTemplate
        errorMessage={'You have no permission to access this resource.'}
      />
    );
  }

  return <>{children}</>;
});

interface NoAccessTemplateProps {
  errorMessage: string;
  noAccessTemplateSx?: SxProps;
}

export const NoAccessTemplate = (props: NoAccessTemplateProps): JSX.Element => {
  const { errorMessage, noAccessTemplateSx } = props;

  return (
    <Box sx={noAccessTemplateSx}>
      <Alert severity="error" variant="outlined">
        {errorMessage}
      </Alert>
    </Box>
  );
};

export default AccessControl;
