import type { Components } from '@mui/material/styles';

import { palette } from '@/lib/theme/palette';

type MuiTextFieldType = Components['MuiTextField'];

const MuiTextField: MuiTextFieldType = {
  defaultProps: {
    size: 'small',
  },
  styleOverrides: {
    root: {
      // type=’number’
      // Chrome, Safari
      'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
        {
          WebkitAppearance: 'none',
          margin: 0,
        },
      // FireFox
      'input[type="number"]': {
        MozAppearance: 'textfield',
      },
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#FFFFFF',

        '&.Mui-focused fieldset': {
          borderColor: palette.primary.main,
          borderWidth: '1px',
          boxShadow: '0px 0px 0px 5px rgba(42, 129, 108, 0.1)',
          borderRadius: '3px',
        },
      },
    },
  },
};

export default MuiTextField;
