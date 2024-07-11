import PhoneCallbackOutlinedIcon from '@mui/icons-material/PhoneCallbackOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

import SwitchModeButton from '@/components/parts/SwitchModeButton';
import TextInput from '@/components/parts/TextInput';
import { useHooks } from '@/components/templates/ScheduleActivity/hooks';

const ScheduleAcitiy = () => {
  const { control, activityType, setActivityType } = useHooks();
  return (
    <Box m={2}>
      <Box p={2} sx={{ backgroundColor: 'white', padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextInput name={'title'} control={control} />
          </Grid>
          <Grid item xs={12}>
            <SwitchModeButton
              value={activityType}
              onChange={(a) => setActivityType(a)}
              toggleButtonGroupProps={{
                size: 'small',
                exclusive: true,
              }}
              buttons={[
                { label: <PhoneCallbackOutlinedIcon />, value: 'Callback' },
                { label: <VideoCallOutlinedIcon />, value: 'Meeting' },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name={'description'}
              control={control}
              label="Description"
              type="textarea"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput name={'timezone'} control={control} label="Timezone" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ScheduleAcitiy;
