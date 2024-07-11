import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectProps } from '@mui/material/Select';
import { alpha, darken, styled } from '@mui/material/styles';

import StatusChip from '@/components/parts/StatusChip';
import {
  type HooksProps,
  useHooks,
} from '@/components/templates/ChipSelect/hooks';

const StyledSelect = styled(Select)(() => ({
  width: '100%',
  border: 'none',
  '& fieldset': {
    border: 'none',
  },
  '& .MuiSelect-icon': {
    display: 'none',
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: alpha(
      theme.palette.secondary.main,
      theme.palette.action.selectedOpacity,
    ),
    '&.Mui-focusVisible': {
      backgroundColor: alpha(
        theme.palette.secondary.main,
        theme.palette.action.selectedOpacity,
      ),
    },
    '&:hover': {
      backgroundColor: darken(
        alpha(
          theme.palette.secondary.main,
          theme.palette.action.selectedOpacity,
        ),
        0.3,
      ),
    },
  },
  '&:hover': {
    backgroundColor: darken(
      alpha(theme.palette.secondary.main, theme.palette.action.selectedOpacity),
      0.3,
    ),
  },
}));

export interface ChipSelectProps extends HooksProps {
  currentStatus: string;
  disabled?: boolean;
  sx?: SelectProps['sx'];
  inputProps?: SelectProps['inputProps'];
}
export const ChipSelect = ({
  currentStatus,
  statusOptions,
  disabled,
  inputProps,
}: ChipSelectProps) => {
  const { handleChange } = useHooks({ statusOptions });
  return (
    <StyledSelect
      value={currentStatus}
      onChange={handleChange}
      disabled={disabled}
      sx={{
        '.MuiOutlinedInput-input': { p: 0, fontSize: 10 },
        '.MuiChip-label': { fontSize: 10 },
        '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':
          { padding: 0 },
      }}
      inputProps={inputProps}
    >
      {statusOptions.map(({ label, color, disabled = false }, index) => {
        return (
          <StyledMenuItem key={index} value={label} disabled={disabled}>
            <StatusChip
              label={label}
              color={color}
              clickable
              sx={{ fontSize: 10 }}
            />
          </StyledMenuItem>
        );
      })}
    </StyledSelect>
  );
};
