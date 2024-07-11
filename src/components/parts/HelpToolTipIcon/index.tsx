import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { SxProps } from '@mui/material/styles';

import Tooltip from '@/components/parts/Tooltip';

interface HelpToolTipIconProps {
  title: string;
  sx?: SxProps;
}

const HelpToolTipIcon = (props: HelpToolTipIconProps) => {
  const { title, sx } = props;

  return (
    <Tooltip arrow title={<>{title}</>} placement="top">
      <HelpOutlineOutlinedIcon
        fontSize="small"
        sx={{
          color: 'text.secondary',
          verticalAlign: 'middle',
          ...sx,
        }}
      />
    </Tooltip>
  );
};

export default HelpToolTipIcon;
