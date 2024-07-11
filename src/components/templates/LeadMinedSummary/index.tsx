import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const LeadMinedSummary = () => {
  return (
    <Paper
      elevation={0}
      sx={{ p: 3, overflowX: 'auto', border: '0.3px solid #DCDCDC' }}
    >
      <Box sx={{ pb: 2, fontWeight: 'bold' }}>Lead Mined Summary</Box>

      <Stack direction="row">
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
        <Stack direction="column" sx={{ minWidth: 80, mr: 4 }}>
          <DataWithLabel title="Leads" value={2} label="" />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default LeadMinedSummary;

const DataWithLabel = ({
  title,
  value,
  label,
}: {
  title: string;
  value: number | string;
  label: string;
}) => {
  return (
    <>
      <Box sx={{ color: grey[400], fontWeight: 'bold' }}>{title}</Box>
      <Box sx={{ fontWeight: 'bold' }}>
        <span style={{ fontSize: 32 }}>{value}</span>
        {label}
      </Box>
    </>
  );
};
