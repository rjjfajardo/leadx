import Edit from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React from 'react';

import UserAvatar from '@/components/parts/UserAvatar';
import { useAuth, useLogout } from '@/hooks/api/useAuth';

const AvatarContainer = styled(Box)(({ theme: { spacing } }) => ({
  paddingTop: spacing(2),
  paddingBottom: spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
}));

const UserInfoWrapper = styled(Typography)(({ theme: { spacing } }) => ({
  maxWidth: '100%',
  width: 300,
  backgroundColor: '#EAF2F0',
  padding: spacing(2),
  paddingTop: spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
}));

const NameDisplay = styled(Typography)(() => ({
  maxWidth: '100%',
  fontSize: 18,
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

// const EmailDisplay = styled(Typography)(() => ({
//   maxWidth: '100%',
//   overflow: 'hidden',
//   textOverflow: 'ellipsis',
// }));

const EditIcon = styled(Edit)(() => ({
  position: 'absolute',
  bottom: 8,
  right: 8,
  cursor: 'pointer',
}));

const AccountMenu = () => {
  const { logout } = useLogout();
  const { user } = useAuth();

  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const closePopover = () => setAnchorEl(null);

  return (
    <>
      <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
        {/* TODO: Change user props data based on logged in user data */}
        <UserAvatar size={30} user={{ lastname: user?.lastName }} />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={closePopover}
      >
        <AvatarContainer>
          <UserAvatar
            size={64}
            sx={{ position: 'absolute', bottom: -32, zIndex: 1 }}
            // TODO: Change user props data based on logged in user data
            user={{ lastname: user?.lastName }}
          />
          <EditIcon
            onClick={() => {
              closePopover();
              router.push('');
            }}
          />
        </AvatarContainer>
        <UserInfoWrapper>
          <NameDisplay>{`${user?.firstName} ${user?.lastName}`}</NameDisplay>
          {/* instead of email will display here the company
          <EmailDisplay>johndoe@gmail.com</EmailDisplay> */}
          <Stack spacing={1} mt={2}>
            <Button
              startIcon={<LogoutIcon />}
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => {
                closePopover();
                logout({ type: 'user_initiated' });
              }}
            >
              Logout
            </Button>
          </Stack>
        </UserInfoWrapper>
      </Popover>
    </>
  );
};

export default AccountMenu;
