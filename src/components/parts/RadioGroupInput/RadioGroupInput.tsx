import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import { Stack } from '@mui/system';

import InputLabel from '@/components/parts/InputLabel';

export interface RadioOption {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
  optionInput?: React.ReactNode;
}

export type RadioGroupFormControlProps = Omit<
  FormControlProps,
  'error' | 'disabled'
>;

/**
 * Properties for {@link RadioGroupInput}.
 */

export interface RadioGroupInputProps extends Omit<RadioGroupProps, 'error'> {
  /**
   * Error message to display when the input is in error state.
   */
  error?: string;
  /**
   * Label to display above the input.
   */
  label?: string;
  /**
   * Options to display in the radio group.
   */
  options: RadioOption[];
  /**
   * Determines whether the required label is displayed.
   */
  hasRequiredLabel?: boolean;
  /**
   * Props to pass to the FormControl component.
   * @see {@link https://mui.com/api/form-control/}
   */
  formControlProps?: RadioGroupFormControlProps;
}

const RadioGroupInput = (props: RadioGroupInputProps) => {
  const {
    label,
    error,
    formControlProps,
    hasRequiredLabel,
    options = [],
    ...rest
  } = props;
  const helperText = error ?? undefined;

  return (
    <FormControl error={!!error} {...formControlProps}>
      <InputLabel required={hasRequiredLabel}>{label}</InputLabel>

      <RadioGroup {...rest}>
        {options.map((option) => (
          <Stack direction="row" gap={2} key={option.label}>
            <FormControlLabel
              key={
                typeof option.value === 'boolean'
                  ? option.value.toString()
                  : option.value
              }
              value={option.value}
              control={<Radio />}
              label={option.label}
              disabled={option.disabled}
              sx={{
                '& .MuiTypography-root': {
                  fontSize: 14,
                  wordBreak: 'break-all',
                  width: 'max-content',
                },
              }}
            />
            {option.optionInput}
          </Stack>
        ))}
      </RadioGroup>

      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default RadioGroupInput;
