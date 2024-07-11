import LoadingButton from '@mui/lab/LoadingButton';
import type { ButtonProps } from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';

/**
 * Properties for {@link ActionButton}
 */
type ActionButtonProps = Pick<
  ButtonProps,
  'onClick' | 'startIcon' | 'endIcon' | 'children' | 'disabled'
> & {
  isLoading?: boolean;
  mobile?: boolean;
  mobileDropDown?: boolean;

  /**
   * Additional SX properties.
   * @see {@link https://mui.com/system/the-sx-prop/}
   */
  sx?: SxProps<Theme>;

  variant?: 'text' | 'outlined';
  menuRef?: React.RefObject<HTMLButtonElement>;
};

const StyledActionButton = styled(LoadingButton)(({ theme, loading }) => ({
  flexGrow: 1,
  flexDirection: 'row',
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(-0.5),
  },
  '& .MuiButton-endIcon': {
    marginRight: theme.spacing(-0.5),
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& .MuiButton-startIcon': {
      position: loading ? 'absolute' : 'unset',
      marginRight: 0,
      marginLeft: 0,
      marginBottom: theme.spacing(0.5),
    },
    '& .MuiButton-endIcon': {
      position: 'absolute',
      right: theme.spacing(1),
    },
    '& .MuiLoadingButton-loadingIndicator': {
      marginBottom: theme.spacing(0.5),
      position: 'unset',
    },
  },
}));

const StyledActionMobileButton = styled(LoadingButton)(
  ({ theme, loading }) => ({
    // 他要素のstyleで上書きされないようにstyle指定
    // webviewのバグの可能性、原因不明
    color: theme.palette.primary.main,
    borderColor: theme.palette.grey[400],
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    '& .MuiButton-startIcon': {
      position: loading ? 'absolute' : 'unset',
      marginRight: 0,
      marginLeft: 0,
    },
    '& .MuiButton-endIcon': {
      position: 'absolute',
      right: theme.spacing(1),
    },
    '& .MuiLoadingButton-loadingIndicator': {
      position: 'unset',
    },
  }),
);

const StyledActionMobileDropdown = styled(LoadingButton)(
  ({ theme, loading }) => ({
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& .MuiButton-startIcon': {
      position: loading ? 'absolute' : 'unset',
      marginRight: theme.spacing(1.5),
      marginLeft: 0,
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
    '& .MuiButton-endIcon': {
      position: 'absolute',
      right: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    '& .MuiLoadingButton-loadingIndicator': {
      position: 'unset',
    },
  }),
);

/**
 * Renders a button that adapts to different screen sizes.
 * @param props - See {@link ActionButtonProps}
 */
const ActionButton = (props: ActionButtonProps) => {
  const {
    children,
    onClick,
    startIcon,
    endIcon,
    isLoading = false,
    sx,
    mobile,
    mobileDropDown,
    variant = 'outlined',
    menuRef,
    disabled,
  } = props;

  if (mobileDropDown) {
    return (
      <StyledActionMobileDropdown
        variant="outlined"
        onClick={onClick}
        disabled={disabled}
        startIcon={startIcon}
        endIcon={endIcon}
        loading={isLoading}
        loadingPosition="start"
        sx={sx}
        ref={menuRef}
      >
        {children}
      </StyledActionMobileDropdown>
    );
  }

  if (mobile) {
    return (
      <StyledActionMobileButton
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        startIcon={startIcon}
        endIcon={endIcon}
        loading={isLoading}
        loadingPosition="start"
        sx={sx}
        ref={menuRef}
      >
        {children}
      </StyledActionMobileButton>
    );
  }
  return (
    <StyledActionButton
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      loading={isLoading}
      loadingPosition="start"
      sx={sx}
      ref={menuRef}
    >
      {children}
    </StyledActionButton>
  );
};

export default ActionButton;
