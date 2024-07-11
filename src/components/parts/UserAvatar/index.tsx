import { Theme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { SxProps } from '@mui/system';

import { palette } from '@/lib/theme/palette';

export interface UserAvatarInfo {
  image?: string | null;
  lastname?: string;
}

interface UserAvatarProps {
  size: number;
  user: UserAvatarInfo;
  showToolTip?: boolean;
  sx?: SxProps<Theme>;
}

const UserAvatar = (props: UserAvatarProps) => {
  const { user, size, showToolTip = false, sx: sxProps } = props;

  const sx = {
    width: size,
    height: size,
    fontSize: size / 2,
    backgroundColor: palette.secondary.dark,
    ...sxProps,
  };

  return (
    <>
      {user.image ? (
        <Tooltip title={showToolTip && user.lastname}>
          <Avatar sx={sx} src={user.lastname} />
        </Tooltip>
      ) : user.lastname ? (
        <Tooltip title={showToolTip && user.lastname}>
          <Avatar sx={sx}>{user.lastname[0]}</Avatar>
        </Tooltip>
      ) : (
        <Tooltip title={showToolTip && user.lastname}>
          <Avatar sx={sx} />
        </Tooltip>
      )}
    </>
  );
};

export default UserAvatar;
