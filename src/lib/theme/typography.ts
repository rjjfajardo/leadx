import { TypographyOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    formLabel: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    formLabel?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    formLabel: true;
  }
}

export const typography: TypographyOptions = {
  fontSize: 14,
  // fontFamily: '',
  h1: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 1,
    margin: 0,
  },
  body1: {},
  caption: {
    lineHeight: 1,
    fontSize: 10,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    textTransform: 'none',
    fontWeight: 500,
    lineHeight: 1,
  },
};
