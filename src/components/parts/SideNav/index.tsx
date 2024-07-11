import { PendingActionsTwoTone } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import { styled, SxProps } from '@mui/material/styles';
import Box from '@mui/system/Box';
import Image from 'next/image';
import { useRouter } from 'next/router';

import AssignedLeadsIcon from '@/components/icons/AssignedLeadsIcon';
import LeadsIcon from '@/components/icons/LeadsIcon';
import SanitizedBucketIcon from '@/components/icons/SanitizedBucketIcon';
import UnsanitizedBucketIcon from '@/components/icons/UnsanitizedBucketIcon';
import Link from '@/components/parts/Link';
import { OFFICIAL_ROLE_NAMES } from '@/constants/roles';
import { useAccessControl } from '@/hooks/useAccessControl';
import { palette } from '@/lib/theme/palette';

export const SIDE_DRAWER_WIDTH = 70;

export type SideNavigationItem = {
  key: string;
  icon?: React.ReactElement;
  label: string;
  href: string;
  hidden?: boolean;
};

const StyledDrawer = styled(Drawer)(() => ({
  width: SIDE_DRAWER_WIDTH,
  [`& .MuiDrawer-paper`]: {
    width: SIDE_DRAWER_WIDTH,
    color: 'white',
    backgroundColor: palette.primary.light,
    border: 0,
  },
}));

type Props = {
  sx?: SxProps;
  backgroundColor?: string;
  isSelected?: boolean;
};

const SideNav = (props: Props) => {
  const { hasUserRole } = useAccessControl();
  const router = useRouter();

  const sideNavigationItems: SideNavigationItem[] = [
    {
      key: 'dashboard',
      icon: <DashboardIcon />,
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      key: 'mined-leads',
      icon: <UnsanitizedBucketIcon />,
      label: 'Mined Leads',
      href: '/unsanitized-distro/leads',
      //TEMPORARY
      //TODO: Add specific resources for every distro to make use of AccessControl
      hidden: !(
        hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_MINER) ||
        hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_VERIFIER) ||
        hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_GEN_SUPERVISOR)
      ),
    },
    {
      key: 'lead-verification',
      icon: <PendingActionsTwoTone sx={{ fontSize: 30 }} />,
      label: 'Lead Verification',
      href: '/unsanitized-distro/leads/verification',
      //TEMPORARY
      //TODO: Add specific resources for every distro to make use of AccessControl
      hidden: !(
        hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_VERIFIER) ||
        hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_GEN_SUPERVISOR)
      ),
    },
    {
      key: 'sanitized-leads',
      icon: <SanitizedBucketIcon />,
      label: 'Sanitized Leads',
      href: '/sanitized-distro/leads',
      //TEMPORARY
      //TODO: Add specific resources for every distro to make use of AccessControl
      hidden: !hasUserRole(OFFICIAL_ROLE_NAMES.LEAD_GEN_SUPERVISOR),
    },
    {
      key: 'target',
      icon: <LeadsIcon />,
      label: 'Target',
      href: '/sanitized-distro/leads/assigned',
      hidden: !hasUserRole(OFFICIAL_ROLE_NAMES.SALES_AGENT),
    },
    {
      key: 'assigned-leads',
      icon: <AssignedLeadsIcon />,
      label: 'Assigned Leads',
      href: '/assigned-leads',
      hidden: true,
    },
  ];

  return (
    <StyledDrawer variant="permanent" color="white" sx={{ ...props.sx }}>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            marginBottom: '20px',
            position: 'relative',
            height: 45,
            width: 45,
          }}
        >
          <Image
            src="/CMM-logo.png"
            alt="CMM Logo"
            fill
            style={{ objectFit: 'contain' }}
            sizes="small"
          />
        </Box>

        {sideNavigationItems
          .filter((item) => !item.hidden)
          .map((item) => (
            <Link
              href={item.href}
              sx={{ color: palette.primary.dark, flexGrow: 1 }}
              key={item.key}
            >
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  selected={router.asPath === item.href}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor:
                        props.backgroundColor ?? palette.secondary.dark,
                      color: 'white',
                      '.unsanitized-inner-vector': {
                        fill: palette.secondary.dark,
                      },
                    },
                    '&:hover': {
                      backgroundColor:
                        props.backgroundColor ?? palette.secondary.main,
                      color: 'white',
                      '.unsanitized-inner-vector': {
                        fill: palette.secondary.dark,
                      },
                    },
                    borderRadius: '5px',
                    padding: 0,
                    '.unsanitized-inner-vector': {
                      fill: 'white',
                    },
                  }}
                >
                  <Stack
                    sx={{
                      '&>*': {
                        minWidth: 24,
                        minHeight: 24,
                      },
                      padding: '10px',
                    }}
                  >
                    {item.icon}
                  </Stack>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
      </List>
    </StyledDrawer>
  );
};

export default SideNav;
