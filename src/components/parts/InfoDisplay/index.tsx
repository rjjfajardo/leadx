import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/system';

type InfoDisplayProps = {
  label: string;
  values: string[];
  direction?: 'row' | 'column';
  sx?: SxProps;
  showOrderNumber?: boolean;
};

const InfoDisplay = ({
  label,
  values,
  direction,
  sx,
  showOrderNumber = false,
}: InfoDisplayProps) => {
  return (
    <Stack
      gap={0.3}
      sx={{
        ...sx,
        ...(direction === 'row' && {
          flexDirection: 'row',
          columnGap: 2,
          alignItems: 'center',
        }),
      }}
    >
      <Typography fontSize={12} fontWeight={500} color={'grey.500'}>
        {label}
      </Typography>
      {values.map((value, idx) => (
        //NOTE: using value as key in the case of same value causes duplicated key (e.g Publisher [0]Rex [1]Rex)
        <Stack direction="row" key={idx} justifyContent="space-between">
          <Stack direction="row" alignItems="center" gap={1}>
            {showOrderNumber && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                border={1}
                borderRadius="50%"
                padding={1}
                width={20}
                height={20}
                color="white"
                fontWeight={600}
                fontSize={12}
                sx={{ backgroundColor: 'primary.light' }}
              >
                {idx + 1}
              </Box>
            )}
            <Typography fontSize={18}>{value || '-'}</Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default InfoDisplay;
