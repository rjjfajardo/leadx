/**
 *
 * Note: Change theme
 */

import { createTheme } from '@mui/material/styles';

import * as components from './components';
import { palette } from './palette';
import { typography } from './typography';
// import { zIndex } from './zIndex'

const theme = createTheme({
  palette,
  components,
  //   zIndex,
  typography,
});

export default theme;
