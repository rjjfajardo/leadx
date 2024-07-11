import Alert from '@mui/material/Alert';
import MuiSnackbar from '@mui/material/Snackbar';

import { useSnackbar } from '@/hooks/useSnackbar';
import { SnackProps } from '@/store/slice/snackbarSlice';

const Snackbar = () => {
  const { snackbarProps, setSnackbar } = useSnackbar();
  const {
    message,
    action,
    severity = 'success',
    ...rest
  } = snackbarProps as SnackProps;

  const onClose = () => {
    setSnackbar({ message, severity, open: false });
  };

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      {...rest}
      onClose={onClose}
      onClick={onClose}
    >
      <Alert
        onClose={onClose}
        elevation={6}
        variant="filled"
        severity={severity}
        action={action}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
