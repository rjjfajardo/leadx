import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Dispatch, SetStateAction } from 'react';

import CMMDialog from '@/components/parts/CMMDialog';
import { useHooks } from '@/components/templates/Leads/CallLeadDialog/hooks';

type Props = {
  open: boolean;
  handleClose: (value: boolean) => void;
  leadContactId: number;
  phoneNumber: string;
  setOpenIniateCallDialog: Dispatch<SetStateAction<boolean>>;
};

const CallLeadDialog = ({
  open,
  handleClose,
  leadContactId,
  phoneNumber,
  setOpenIniateCallDialog,
}: Props) => {
  const {
    handleResetAndClose,
    openOngoingCall,
    setOpenOngoingCallDialog,
    timeSpent,
    handleStartTimer,
    handleStopTimer,
    formattedDuration,
    createContactLogHandler,
  } = useHooks({
    handleClose,
    leadContactId,
  });

  return (
    <>
      <CMMDialog
        open={open}
        onClose={handleResetAndClose}
        hideBackdrop
        title={`Initiating Call to ${phoneNumber}`}
        onSubmit={() => {
          if (formattedDuration === '' && !openOngoingCall) {
            window.open(`tel:${phoneNumber}`, '_self');
            setOpenOngoingCallDialog(true);
            handleStartTimer();
            setOpenIniateCallDialog(false);
          } else {
            createContactLogHandler();
          }
        }}
        submitLabel={
          formattedDuration === '' && !openOngoingCall ? 'Call' : 'Save'
        }
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
        <Box>Duration: {formattedDuration || '0sec'}</Box>
      </CMMDialog>

      <CMMDialog
        open={openOngoingCall}
        onClose={() => console.log('TODO:')}
        title={`Ongoing Call to ${phoneNumber}`}
        onSubmit={() => {
          setOpenOngoingCallDialog(false);
          handleStopTimer();
          setOpenIniateCallDialog(true);
        }}
        hiddenCancelButton
        submitLabel="End Call"
        sx={{
          '& .MuiDialog-paperScrollPaper': {
            width: '80%',
          },
          '& .MuiDialogContent-root > *': {
            paddingTop: 2,
          },
        }}
      >
        <TimeContainer>
          {`${timeSpent?.hrs}:${timeSpent?.mins}:${timeSpent?.secs}`}
        </TimeContainer>
      </CMMDialog>
    </>
  );
};

export default CallLeadDialog;

const TimeContainer = styled(Stack)(({ theme: { spacing } }) => ({
  marginTop: 20,
  border: '1px solid #DCDCDC',
  backgroundColor: '#F5F5F5',
  justifyContent: 'center',
  alignItems: 'center',
  padding: spacing(2),
  borderRadius: 3,
  fontWeight: 600,
  fontSize: 35,
  flex: 1,
}));
