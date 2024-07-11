import CheckBox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { ReactNode } from 'react';

import InputLabel from '@/components/parts/InputLabel';

export type CheckBoxFormControlProps = Omit<
  FormControlProps,
  'error' | 'disabled'
>;

export type CheckBoxFormControlLabelProps = Pick<FormControlLabelProps, 'sx'>;

export type CheckBoxInputProps = Omit<
  CheckboxProps,
  'error' | 'defaultValue'
> & {
  /**
   * Error message to show on the input.
   */
  error?: string;
  /**
   * Label to show next to the checkbox.
   */
  label?: string | ReactNode;
  /**
   * Additional properties for the wrapping form control.
   * @see {@link https://mui.com/api/form-control/}
   */
  formControlProps?: CheckBoxFormControlProps;
  /**
   * Additional properties for the form control label.
   * @see {@link https://mui.com/api/form-control-label/}
   */
  formControlLabelProps?: CheckBoxFormControlLabelProps;
  /**
   * Position of the label
   */
  labelPosition?: string;
};

const CheckBoxInput = (props: CheckBoxInputProps) => {
  const {
    label,
    error,
    disabled,
    formControlProps,
    formControlLabelProps,
    value,
    labelPosition = 'right',
    ...rest
  } = props;

  const { sx: formControlLabelSx, ...restFormControlLabelProps } =
    formControlLabelProps ?? {};

  const helperText = error ?? undefined;

  return (
    <FormControl error={!!error} disabled={disabled} {...formControlProps}>
      {label ? (
        <>
          {labelPosition === 'top' && <InputLabel>{label}</InputLabel>}
          <FormControlLabel
            control={<CheckBox {...rest} checked={!!value} />}
            label={labelPosition === 'right' ? label : ''}
            sx={{
              '& .MuiTypography-root': { fontSize: 14 },
              ...formControlLabelSx,
            }}
            {...restFormControlLabelProps}
          />
        </>
      ) : (
        <CheckBox {...rest} checked={!!value} />
      )}
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
export default CheckBoxInput;
