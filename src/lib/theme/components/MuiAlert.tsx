import type { Components } from '@mui/material/styles';

import { palette } from '@/lib/theme/palette';

type MuiAlertType = Components['MuiAlert'];

const MuiAlert: MuiAlertType = {
  styleOverrides: {
    filledSuccess: {
      backgroundColor: palette.success.main,
    },
    filledError: {
      backgroundColor: palette.error.dark,
    },
    standardInfo: {
      backgroundColor: palette.info.main,
    },
  },
};

export default MuiAlert;
