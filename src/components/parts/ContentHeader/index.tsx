import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { SxProps } from '@mui/system';

import { Breadcrumbs, BreadcrumbType } from '@/components/parts/Breadcrumbs';

export interface ContentHeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbType[];
  titleWrapperSx?: SxProps;
  actions?: React.ReactNode;
  wrapperSx?: SxProps;
}

export const ContentHeader = (props: ContentHeaderProps) => {
  const { title, breadcrumbs, titleWrapperSx, actions, wrapperSx } = props;

  return (
    <Box sx={{ mt: breadcrumbs ? 0.5 : 1.5, mb: 2, ...wrapperSx }}>
      {breadcrumbs && (
        <Box mb={2}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </Box>
      )}
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        width="100%"
        mb={2}
        sx={titleWrapperSx}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Typography sx={{ fontSize: 28, fontWeight: 'bold' }}>
            {title}
          </Typography>
          {actions && <Actions>{actions}</Actions>}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContentHeader;

const Actions = styled('aside')(({ theme }) => ({
  flexShrink: 0,
  display: 'flex',
  gap: theme.spacing(1.5),
  justifyContent: 'flex-end',
}));
