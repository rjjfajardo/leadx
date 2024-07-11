import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import CMMDialog from '@/components/parts/CMMDialog';
import SelectInput, { Option } from '@/components/parts/SelectInput';
import TextInput from '@/components/parts/TextInput';
import {
  SelectedTier,
  useHooks,
} from '@/components/templates/Leads/AssignLeadDialog/hooks';
import theme from '@/lib/theme';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const AssignLeadDialog = ({ open, handleClose }: Props) => {
  const {
    control,
    selectedTier,
    setSelectedTier,
    options,
    onSubmit,
    handleCloseAndReset,
    salesAgentsCount,
  } = useHooks({ handleClose });

  const renderOptions = (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: Option,
  ) => {
    return (
      <MenuItem {...props} disabled={option.disabled}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Typography>{option.label}</Typography>
          <Typography color={option.color}>{option.count}</Typography>
        </Stack>
      </MenuItem>
    );
  };

  const buttons: SelectedTier[] = ['All', 'TIER_1', 'TIER_2', 'TIER_3'];

  return (
    <CMMDialog
      open={open}
      title="Assign Leads To Sales Agent"
      submitLabel={`Assign (${salesAgentsCount?.length ?? '0'})`}
      onSubmit={onSubmit}
      submitButtonProps={{
        disabled: !salesAgentsCount?.length,
      }}
      onClose={handleCloseAndReset}
      dialogContentSx={{
        marginTop: '10px',
      }}
      sx={{
        '& .MuiDialog-paperScrollPaper': {
          width: '80%',
        },
      }}
    >
      <Stack gap={2}>
        <Stack direction="row" gap={2}>
          {buttons.map((name) => (
            <Button
              key={name}
              variant="contained"
              size="small"
              sx={{
                borderRadius: 100,
                backgroundColor:
                  name === selectedTier
                    ? theme.palette.success.main
                    : grey[500],
                px: 3,
              }}
              onClick={() => setSelectedTier(name)}
            >
              {name.split('_').join(' ')}
            </Button>
          ))}
        </Stack>
        <SelectInput
          control={control}
          name="salesAgentIds"
          label="Sales Agents"
          options={options}
          multiple
          renderOption={renderOptions}
        />
        <TextInput
          control={control}
          name="numberOfLeads"
          label="Number of Leads"
          type="number"
        />
      </Stack>
    </CMMDialog>
  );
};

export default AssignLeadDialog;
