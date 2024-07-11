import { styled } from '@mui/material/styles';

export const TemplateContent = styled('main')(({ theme }) => ({
  marginLeft: `70px`,
  backgroundColor: '#FBFBFB',
  padding: theme.spacing(3),
  height: '100%',
  width: '100%',
}));

export const TemplateContentWithDataGrid = styled(TemplateContent)(() => ({
  height: `calc(100vh - 64px)`,
  flexDirection: 'column',
  overflow: 'hidden',
  display: 'flex',
}));

export type TemplateContentProps = React.ComponentProps<typeof TemplateContent>;

export default TemplateContent;
