import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { CircularProgressProps } from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material/styles';
import { AnimatePresence,motion } from 'framer-motion';

import SvgComponent from '@/components/icons/Logo';
import Loading from '@/components/parts/Loading';

interface Props {
  iconProps?: CircularProgressProps;
  sx?: SxProps<Theme>;
  height?: string;
}

export const LoadingLayout = ({ iconProps, sx, height = '100vh' }: Props) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height, ...sx, border: '3px solid red' }}
    >
      <Loading size={64} {...iconProps} />
      <AnimatePresence>
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 360],
            borderRadius: ['20%', '20%', '50%', '50%', '20%'],
          }}
        >
          <SvgComponent />
        </motion.div>
      </AnimatePresence>
    </Stack>
  );
};

type LoadingCoverProps = {
  sx?: SxProps<Theme>;
};
export const LoadingCover = (props: LoadingCoverProps) => {
  const { sx } = props;
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'common.white',
        opacity: 0.4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      <AnimatePresence>
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 360],
            borderRadius: ['20%', '20%', '50%', '50%', '20%'],
          }}
        >
          <SvgComponent />
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};
