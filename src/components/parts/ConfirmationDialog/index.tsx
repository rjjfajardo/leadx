import { Typography } from '@mui/material';

import CMMDialog from '@/components/parts/CMMDialog';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  content: string;
  handleSubmit: () => void;
  disableConfirmBtn?: boolean;
}

const ConfirmationDialog = ({
  open,
  onClose,
  content,
  handleSubmit,
  disableConfirmBtn = false,
}: ConfirmationDialogProps) => {
  return (
    <CMMDialog
      open={open}
      title="Confirmation"
      onClose={onClose}
      onSubmit={handleSubmit}
      cancelButtonProps={{ variant: 'outlined', color: 'secondary' }}
      cancelLabel="Cancel"
      submitButtonProps={{
        variant: 'contained',
        color: 'primary',
      }}
      disableSubmitBtn={disableConfirmBtn}
      submitLabel="Confirm"
      dialogActionsSx={{ borderTop: '1px solid #dcdcdc' }}
    >
      <Typography mt={2.5}>{content}</Typography>
    </CMMDialog>
  );
};

export default ConfirmationDialog;
