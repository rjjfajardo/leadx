import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import theme from '@/lib/theme';

interface StyledChipProps {
  hovercolor: string;
  bgColor: string;
}

const StyledChip = styled(Chip, {
  shouldForwardProp: (prop: string) => !['bgColor'].includes(prop),
})<StyledChipProps>(({ hovercolor, bgColor }) => ({
  fontSize: 12,
  fontWeight: 800,
  height: 34,
  textTransform: 'uppercase',
  backgroundColor: bgColor,
  '&:hover': {
    backgroundColor: hovercolor,
    opacity: hovercolor ? 0.7 : 1,
  },
}));

export interface StatusChipProps {
  label: string | JSX.Element;
  color: string;
  sx?: SxProps;
  clickable?: boolean;
}

const StatusChip = (props: StatusChipProps) => {
  const { label, color, clickable, sx } = props;

  return (
    <StyledChip
      label={label}
      bgColor={color}
      clickable={clickable}
      hovercolor={clickable ? color : ''}
      sx={{ color: theme.palette.getContrastText(color), ...sx }}
    />
  );
};

export default StatusChip;
