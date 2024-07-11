import type { Components } from '@mui/material/styles';

import { palette } from '@/lib/theme/palette';

type MuiCheckboxType = Components['MuiCheckbox'];

const MuiCheckbox: MuiCheckboxType = {
  styleOverrides: {
    root: {
      '&.Mui-checked': {
        color: palette.primary.main,
      },
      '&.Mui-checked.Mui-disabled': {
        // palette.action.disabled
        color: 'rgba(0, 0, 0, 0.26)',
      },

      '&:after': {
        content: '""',
        height: 14,
        width: 14,
        position: 'absolute',
        backgroundColor: '#FFFFFF',
      },
      '&.Mui-checked:after': {
        zIndex: -1,
      },
    },
  },
};

export default MuiCheckbox;
