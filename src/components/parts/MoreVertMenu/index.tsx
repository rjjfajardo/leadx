import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Theme } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuListProps } from '@mui/material/MenuList';
import { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

import { useHooks } from './hooks';

export interface Option {
  label: string;
  onClick: () => void;
  color?: string;
  icon?: React.ReactNode;
  hidden?: boolean;
  disabled?: boolean;
}

interface DividerOption {
  /**
   * Determines if the item is a divider.
   */
  divider: boolean;

  hidden?: boolean;
}

/**
 * Represents a menu item that can be an {@link Option} or {@link DividerOption}
 */
export type OptionInterface = Option | DividerOption;

/**
 * Properties for {@link MoreVertMenu}
 */
interface MoreVertMenuProps {
  /**
   * List of menu items.
   * @see {@link DividerOption}
   * @see {@link Option}
   */
  options: OptionInterface[];
  /**
   * SX Property for trigger button.
   * @see {@link https://mui.com/system/getting-started/the-sx-prop/}
   */
  sx?: SxProps<Theme>;
  /**
   * Properties for menu's list.
   * @see {@link https://mui.com/material-ui/api/menu-list/}
   */
  MenuListProps?: MenuListProps;
  /**
   * Properties for menu.
   * @see {@link https://mui.com/material-ui/api/menu/}
   */
  menuProps?: Partial<MenuProps>;
  /**
   * Custom toggle button instead of the default MoreVertIcon
   */
  useButtonToggle?: boolean;
  /**
   * Button props for button toggle
   */
  ButtonProps?: Pick<ButtonProps, 'color' | 'variant' | 'endIcon'>;
  /**
   * Label for button toggle
   */
  buttonToggleLabel?: string;
}

const MoreVertMenu = ({
  options,
  sx,
  MenuListProps,
  menuProps,
  useButtonToggle,
  ButtonProps,
  buttonToggleLabel,
}: MoreVertMenuProps) => {
  const { anchorEl, open, handleClick, handleClose } = useHooks();

  return (
    <>
      {useButtonToggle ? (
        <Button onClick={handleClick} {...ButtonProps} variant="text">
          {buttonToggleLabel}
        </Button>
      ) : (
        <IconButton
          onClick={handleClick}
          size="small"
          disableRipple
          sx={{
            p: 0,
            color: open ? 'rgba(34, 112, 89)' : undefined,
            '&.MuiIconButton-root': {
              backgroundColor: open ? 'rgba(235, 243, 241)' : 'transparent',
            },
            ...sx,
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={MenuListProps}
        {...menuProps}
      >
        {options.map((option, index) =>
          !option.hidden ? (
            'divider' in option ? (
              <Divider key={index} />
            ) : (
              <MenuItem
                key={index}
                onClick={() => {
                  option.onClick();
                  handleClose();
                }}
                disabled={option.disabled}
                sx={{ color: option.color }}
              >
                {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
                <Typography noWrap>{option.label}</Typography>
              </MenuItem>
            )
          ) : null,
        )}
      </Menu>
    </>
  );
};

export default memo(MoreVertMenu);
