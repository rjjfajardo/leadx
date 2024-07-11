import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import * as React from 'react';

const LayoutBase = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
}));

const Panel = styled(Stack)(({ theme }) => ({
  padding: 40,
  margin: '200px 0px 0px 0px',
  minWidth: '100%',
  flex: 1,
  [theme.breakpoints.up('md')]: {
    minWidth: 670,
  },
}));

const NonLoginForm = (props: {
  children: React.ReactNode;
  backgroundColor?: string;
  maxWidth?: number;
}) => {
  const { children, backgroundColor = '#fdfdfd', maxWidth } = props;

  return (
    <LayoutBase sx={{ backgroundColor }}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          position: 'relative',
        }}
      >
        <Image
          src="/carousel.png"
          alt=""
          // fill
          width={1038}
          height={988}
          // style={{ objectFit: 'contain' }}
        />
      </Box>
      <Panel sx={{ maxWidth }}>{children}</Panel>
    </LayoutBase>
  );
};

export default NonLoginForm;
