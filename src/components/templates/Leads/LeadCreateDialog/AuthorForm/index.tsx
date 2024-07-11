import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useFieldArray, useFormContext } from 'react-hook-form';

import PhoneInput from '@/components/parts/PhoneInput';
import SelectInput from '@/components/parts/SelectInput';
import TextInput from '@/components/parts/TextInput';
import { LeadFormValues } from '@/components/templates/Leads/LeadCreateDialog/hooks';

const AuthorForm = () => {
  const { control } = useFormContext<LeadFormValues>();

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control,
    name: 'emails',
  });

  const {
    fields: phoneNumberFields,
    append: appendPhoneNumber,
    remove: removePhoneNumber,
  } = useFieldArray({
    control,
    name: 'phoneNumbers',
  });

  return (
    <Stack direction="row" gap={4} sx={{ flexGrow: 1 }}>
      <Stack gap={2} width="50%">
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <TextInput control={control} name="author.prefix" label="Prefix" />
          </Grid>
          <Grid item xs={8}>
            <TextInput
              control={control}
              name="author.firstName"
              label="First Name"
              hasRequiredLabel
            />
          </Grid>
        </Grid>

        <TextInput
          control={control}
          name="author.middleName"
          label="Middle Name"
        />
        <TextInput
          control={control}
          name="author.lastName"
          label="Last Name"
          hasRequiredLabel
        />
        <TextInput control={control} name="author.alias" label="Pen Name" />
        <SelectInput
          control={control}
          name="author.gender"
          label="Gender"
          options={[
            { id: 'FEMALE', label: 'Female' },
            { id: 'MALE', label: 'Male' },
          ]}
        />
        <>
          {/* <Label label="Email" /> */}
          {emailFields.map((_email, index) => (
            <Stack direction="row" gap={1} alignItems="end" key={_email.id}>
              <TextInput
                control={control}
                name={`emails.${index}.email`}
                label={index === 0 ? 'Email' : ''}
                hasRequiredLabel={index === 0}
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
            onClick={() => appendEmail({ email: '' })}
          >
            Add email
          </Button>
        </>
      </Stack>
      <Stack gap={2} width="50%">
        <TextInput control={control} name="address.street" label="Street" />
        <TextInput control={control} name="address.city" label="City" />
        <TextInput control={control} name="address.state" label="State" />
        <TextInput control={control} name="address.zip" label="Zip Code" />
        <TextInput control={control} name="address.country" label="Country" />
        <>
          {/* <Label label="Phone Number" /> */}
          {phoneNumberFields.map((number, index) => (
            <Stack direction="row" gap={1} alignItems="end" key={number.id}>
              <PhoneInput
                control={control}
                name={`phoneNumbers.${index}.phoneNumber`}
                hasRequiredLabel={index === 0}
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
            onClick={() => appendPhoneNumber({ phoneNumber: '' })}
          >
            Add phone
          </Button>
        </>
      </Stack>
    </Stack>
  );
};

export default AuthorForm;
