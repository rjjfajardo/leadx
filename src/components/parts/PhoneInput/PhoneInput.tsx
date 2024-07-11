import FormControl, { FormControlProps } from '@mui/material/FormControl';
import { memo } from 'react';
import PhoneInput, { PhoneInputProps as PhoneProps } from 'react-phone-input-2';

import InputLabel, { InputLabelProps } from '@/components/parts/InputLabel';

export type PhoneInputFormControlProps = Omit<
  FormControlProps,
  'error' | 'disabled'
>;

export type PhoneInputLabelRender = (
  props: Pick<InputLabelProps, 'optional' | 'required' | 'children'>,
) => JSX.Element;

export type PhoneInputLabelProps = string | PhoneInputLabelRender;

type LabelProps = {
  hasRequiredLabel?: boolean;
  hasOptionalLabel?: boolean;
  label?: PhoneInputLabelProps;
};

export type PhoneInputProps = PhoneProps &
  LabelProps & {
    error?: string;
    formControlProps?: PhoneInputFormControlProps;
  };

export const Label = (props: LabelProps): JSX.Element => {
  const { hasRequiredLabel, hasOptionalLabel, label } = props;

  if (typeof label === 'string') {
    return (
      <InputLabel required={hasRequiredLabel} optional={hasOptionalLabel}>
        {label}
      </InputLabel>
    );
  }

  if (label) {
    return label({ required: hasRequiredLabel, optional: hasOptionalLabel });
  }

  return <></>;
};

const PhoneInputField = (props: PhoneInputProps) => {
  const {
    label,
    hasRequiredLabel,
    error,
    disabled,
    formControlProps,
    hasOptionalLabel,
    ...rest
  } = props;

  return (
    <FormControl
      error={!!error}
      disabled={disabled}
      fullWidth
      {...formControlProps}
    >
      <Label
        hasOptionalLabel={hasOptionalLabel}
        hasRequiredLabel={hasRequiredLabel}
        label={label}
      />

      <PhoneInput
        {...rest}
        value={rest.value}
        inputStyle={{
          height: '40px',
          width: '100%',
        }}
        inputClass=""
        disableDropdown
      />
    </FormControl>
  );
};
export default memo(PhoneInputField);
