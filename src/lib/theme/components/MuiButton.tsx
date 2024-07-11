import type { Components } from '@mui/material/styles';

type MuiButtonType = Components['MuiButton'];

const MuiButton: MuiButtonType = {
  styleOverrides: {
    root: {
      textTransform: "uppercase",
      fontWeight: "bold",
      minHeight: 40,

      '&.MuiButton-outlined': {
        backgroundColor: '#FFFFFF',
      },
    },
  },
  defaultProps: {
    disableElevation: true,
    variant: 'contained'
  },
};

export default MuiButton;
