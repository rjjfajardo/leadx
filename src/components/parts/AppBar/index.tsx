import NotificationsIcon from '@mui/icons-material/Notifications';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import AccountMenu from '@/components/parts/AccountMenu/AccountMenu';
import Breadcrumbs from '@/components/parts/Breadcrumbs';
import { SIDE_DRAWER_WIDTH } from '@/components/parts/SideNav';
import { useBreadcrumb } from '@/hooks/useBreadcrumb';
import { palette } from '@/lib/theme/palette';

export const TOOLBAR_HEIGHT = 24;

const AppBar = () => {
  const { breadcrumbItems } = useBreadcrumb();

  return (
    <MuiAppBar
      id="header"
      sx={{
        backgroundColor: 'white',
        boxShadow: 0,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'end',
          gap: 2,
          mr: '24px',
          ml: `${SIDE_DRAWER_WIDTH}px`,
          maxHeight: TOOLBAR_HEIGHT,
        }}
      >
        <Breadcrumbs breadcrumbs={breadcrumbItems} sx={{ flexGrow: 1 }} />
        <NotificationsIcon
          sx={{ color: palette.secondary.dark, fontSize: 30 }}
        />
        <AccountMenu />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
