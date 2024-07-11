import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import CMMDialog from '@/components/parts/CMMDialog';
import PhoneInput from '@/components/parts/PhoneInput';
import TextInput from '@/components/parts/TextInput';
import { useHooks } from '@/components/templates/Leads/ContactCreateDialog/hooks';

type Props = {
  open: boolean;
  handleClose: (value: boolean) => void;
};

const ContactCreateDialog = ({ open, handleClose }: Props) => {
  const {
    control,
    handleResetAndClose,
    onSubmit,
    emailFields,
    appendEmail,
    removeEmail,
    phoneNumberFields,
    appendPhoneNumber,
    removePhoneNumber,
  } = useHooks({ handleClose });

  return (
    <CMMDialog
      open={open}
      onClose={handleResetAndClose}
      title="Contact Information"
      onSubmit={onSubmit}
      submitLabel="Save"
      submitButtonProps={{
        startIcon: <SaveIcon />,
      }}
      sx={{
        '& .MuiDialog-paperScrollPaper': {
          width: '80%',
        },
        '& .MuiDialogContent-root > *': {
          paddingTop: 2,
        },
      }}
    >
      <Grid container spacing={1}>
        <Stack mb={2}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextInput
                  control={control}
                  name="address.street"
                  label="Address"
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput control={control} name="address.city" label="City" />
                <TextInput
                  control={control}
                  name="address.state"
                  label="State"
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  control={control}
                  name="address.zip"
                  label="Zip Code"
                />
                <TextInput
                  control={control}
                  name="address.country"
                  label="Country"
                />
              </Grid>
            </Grid>
          </Grid>
        </Stack>
        <Grid item xs={12}>
          {emailFields.map((_email, index) => (
            <Stack
              direction="row"
              gap={1}
              alignItems="end"
              key={_email.id}
              mb={1}
            >
              <TextInput
                control={control}
                name={`emails.${index}.email`}
                label={index === 0 ? 'Email' : ''}
              />
              {emailFields.length > 1 && (
                <IconButton
                  onClick={() => removeEmail(index)}
                  disableRipple
                  sx={{ px: 0 }}
                >
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              )}
            </Stack>
          ))}
          <Button
            variant="text"
            startIcon={<AddIcon />}
            type="button"
            sx={{ width: '100%' }}
            onClick={() => appendEmail({ email: '' })}
          >
            Add email
          </Button>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          {phoneNumberFields.map((number, index) => (
            <Stack
              direction="row"
              gap={1}
              alignItems="end"
              key={number.id}
              mb={1}
            >
              <PhoneInput
                control={control}
                name={`phoneNumbers.${index}.phoneNumber`}
                label={index === 0 ? 'Phone Number' : ''}
              />

              {phoneNumberFields.length > 1 && (
                <IconButton
                  onClick={() => removePhoneNumber(index)}
                  disableRipple
                  sx={{ px: 0 }}
                >
                  <DeleteIcon fontSize="medium" />
                </IconButton>
              )}
            </Stack>
          ))}
          <Button
            variant="text"
            startIcon={<AddIcon />}
            type="button"
            sx={{ width: '100%' }}
            onClick={() => appendPhoneNumber({ phoneNumber: '' })}
          >
            Add phone
          </Button>
        </Grid>
      </Grid>
    </CMMDialog>
  );
};

export default ContactCreateDialog;
