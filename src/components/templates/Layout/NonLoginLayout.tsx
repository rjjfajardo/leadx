import Box from '@mui/material/Box';
import * as React from 'react';

const NonLoginLayout = (props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.100' }}>
      {children}
    </Box>
  );
};

export default NonLoginLayout;
