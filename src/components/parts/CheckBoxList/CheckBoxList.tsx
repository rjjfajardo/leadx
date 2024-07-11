import Box from '@mui/material/Box';
import CheckBox, { CheckboxProps } from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  CheckBoxFormControlLabelProps,
  CheckBoxFormControlProps,
} from '@/components/parts/CheckBoxInput/CheckBoxInput';

type Option = {
  /**
   * Id to check if checked.
   */
  id: string;
  /**
   * Label to show next to the checkbox.
   */
  name: ReactNode;
  /**
   * If true, the checkbox will be disabled.
   */
  disabled?: boolean;
};

export type CheckBoxListProps = Omit<
  CheckboxProps,
  'error' | 'defaultValue'
> & {
  /**
   * state name to manage with hook-form.
   */
  name: string;
  /**
   * Error message to show on the checkbox list.
   */
  error?: string;
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
   * Options for the checkbox list.
   * @see {@link Option}
   */
  options: Option[];
  /**
   * Label to show top to the checkbox list.
   */
  label: string;
  /**
   * Value to check if checked.
   */
  value?: string[];
  /**
   * Callback fired when the state is changed.
   */
  onChange?: (value: string[]) => void;
};

/**
 * checkbox list with hook-form.
 *
 * @param props - @See {@link CheckBoxListProps}
 */
const CheckBoxList = (props: CheckBoxListProps) => {
  const {
    error,
    disabled,
    formControlProps,
    formControlLabelProps,
    value,
    options,
    name,
    label,
    onChange,
    ...rest
  } = props;

  const { getValues } = useFormContext();

  return (
    <FormControl error={!!error} disabled={disabled} {...formControlProps}>
      <Box fontSize={14} fontWeight="bold">
        {label}
      </Box>
      {options.map((option, index) => (
        <FormControlLabel
          key={index}
          control={
            <CheckBox
              inputProps={{ 'aria-label': 'controlled' }}
              {...rest}
              checked={!!value?.some((id) => id === option.id)}
              value={option.id}
              disabled={option.disabled}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                event.target.checked
                  ? onChange?.(
                      getValues(name)
                        ? [...getValues(name), event.target.value]
                        : [event.target.value],
                    )
                  : onChange?.(
                      getValues(name).filter(
                        (value: string) => value !== event.target.value,
                      ),
                    );
              }}
            />
          }
          label={option.name}
          {...formControlLabelProps}
        />
      ))}
    </FormControl>
  );
};

export default CheckBoxList;
