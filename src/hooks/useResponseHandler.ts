import { useCallback } from 'react';

import { useSnackbar } from '@/hooks/useSnackbar';
import { getErrorMessage } from '@/lib/api';

export const useResponseHandler = () => {
  const { setSnackbar } = useSnackbar();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = useCallback((e?: any, errorMessage?: string) => {
    const customErrorMessage = errorMessage
      ? errorMessage
      : 'An error has occurred. Please try again later.';
    const message = e ? getErrorMessage(e) : undefined;
    setSnackbar({
      open: true,
      severity: 'error',
      message: message ?? customErrorMessage,
    });
  }, []);

  const handleSuccess = useCallback((message: string) => {
    setSnackbar({ message, open: true });
  }, []);

  return {
    handleError,
    handleSuccess,
  };
};
