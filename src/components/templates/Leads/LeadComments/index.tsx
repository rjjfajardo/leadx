import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import TextInput from '@/components/parts/TextInput';
import { useHooks } from '@/components/templates/Leads/LeadComments/hooks';

const LeadComments = () => {
  const { control } = useHooks();

  return (
    <Box mt={2}>
      <Box p={2}>
        <Stack direction="row">
          <TextInput
            label=""
            name="comment"
            control={control}
            placeholder="Comment"
            formControlProps={{ fullWidth: true }}
            // Set the defaultValue to resolve "Warning: A component is changing an uncontrolled input of type text to be controlled."
            // https://github.com/react-hook-form/documentation/issues/133
            defaultValue=""
            multiline
          />
          <IconButton type="submit" color="secondary">
            <SendIcon />
          </IconButton>
        </Stack>

        <Stack direction="column" mt={3}>
          {/* @typescript-eslint/no-unused-vars */}
          {Array.from({ length: 20 }, (_, i) => (
            <Box
              py={1}
              sx={{ borderTop: '1px solid', borderColor: 'grey.300' }}
              display="flex"
              flexDirection="column"
              gap={1}
              key={i}
            >
              <Typography fontWeight={600}>John Doe</Typography>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                malesuada eu odio sed finibus. Sed sapien erat, malesuada at
                nibh id, luctus fermentum nunc. Etiam nec ultrices odio, vel
                sodales nibh.
              </span>
              <Typography sx={{ fontSize: 12, color: 'grey.600' }}>
                01/01/2024 05:00:00
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default LeadComments;
