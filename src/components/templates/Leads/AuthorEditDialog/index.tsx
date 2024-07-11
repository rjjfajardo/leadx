import SaveIcon from '@mui/icons-material/Save';
import { Grid } from '@mui/material';

import CMMDialog from '@/components/parts/CMMDialog';
import TextInput from '@/components/parts/TextInput';
import { useHooks } from '@/components/templates/Leads/AuthorEditDialog/hooks';
import { LeadForFindOne } from '@/store/api/gen/leads';

type Props = {
  open: boolean;
  handleClose: (value: boolean) => void;
  author: LeadForFindOne;
};

const AuthorEditDialog = ({ open, handleClose, author }: Props) => {
  const { control, handleResetAndClose, onSubmit } = useHooks({
    author,
    handleClose,
  });

  return (
    <CMMDialog
      open={open}
      onClose={handleResetAndClose}
      title="Edit Author Information"
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
        <Grid item xs={6}>
          <TextInput
            control={control}
            name="firstName"
            label="First Name"
            hasRequiredLabel
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput control={control} name="prefix" label="Prefix" />
        </Grid>
        <Grid item xs={6}>
          <TextInput control={control} name="middleName" label="Middle Name" />
        </Grid>
        <Grid item xs={6}>
          <TextInput
            control={control}
            name="lastName"
            label="Last Name"
            hasRequiredLabel
          />
        </Grid>
        <Grid item xs={6}>
          <TextInput control={control} name="alias" label="Pen Name" />
        </Grid>
      </Grid>
    </CMMDialog>
  );
};

export default AuthorEditDialog;
