import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CMMDialog from '@/components/parts/CMMDialog';
import SelectInput from '@/components/parts/SelectInput';
import TextInput from '@/components/parts/TextInput';
import { useHooks } from '@/components/templates/Leads/AcquireMinedLeadsDialog/hooks';

export interface AcquireMinedLeadsDialogProps {
  open: boolean;
  handleClose: () => void;
}

const AcquireMinedLeadsDialog = ({
  open,
  handleClose,
}: AcquireMinedLeadsDialogProps) => {
  const { control, onSubmit, handleResetAndClose, keywordWatch, countWatch } =
    useHooks({ handleClose });

  return (
    <CMMDialog
      open={open}
      onClose={handleResetAndClose}
      title="Acquire Mined Leads"
      submitLabel="Acquire"
      sx={{
        '& .MuiDialog-paperScrollPaper': {
          width: '35%',
        },
      }}
    >
      <Stack gap={2} mt={2.5}>
        <Typography fontSize={14} color={'grey.600'}>
          Input the number of leads to grab or search for a specific lead to
          grab using a keyword.
        </Typography>
        <Stack direction={'row'} gap={1}>
          <TextInput
            control={control}
            name="count"
            type="number"
            placeholder="Enter number of leads"
          />
          <Button
            type="submit"
            onClick={onSubmit}
            sx={{
              backgroundColor: 'primary.light',
              color: 'black',
              width: '107px',
            }}
            disabled={!countWatch}
          >
            Random
          </Button>
        </Stack>

        <Stack direction={'row'} gap={1}>
          <SelectInput
            control={control}
            name="keywordType"
            options={[
              { id: 'LEAD_NAME', label: 'Name' },
              { id: 'BOOK_TITLE', label: 'Book Title' },
              { id: 'ISBN', label: 'ISBN' },
            ]}
            disableClearable
          />
          <TextInput
            control={control}
            name="keyword"
            placeholder="Enter keyword"
            fullWidth
          />
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={!keywordWatch}
            sx={{
              backgroundColor: 'primary.light',
              color: 'black',
              flexShrink: 0,
            }}
          >
            Search
          </Button>
        </Stack>
      </Stack>
    </CMMDialog>
  );
};

export default AcquireMinedLeadsDialog;
