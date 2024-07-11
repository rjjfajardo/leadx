import { memo } from 'react';
import type { Control, RegisterOptions } from 'react-hook-form';
import { useController } from 'react-hook-form';

import Presentation, {
  PhoneInputLabelProps,
  PhoneInputProps,
} from './PhoneInput';

export type FormatType = 'phone' | 'email' | 'zenhan' | 'zipcode';

export type Props = Omit<PhoneInputProps, 'label' | 't' | 'onChange'> & {
  label?: PhoneInputLabelProps;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  rules?: RegisterOptions;
  defaultValue?: string | null;
};

const PhoneInput = (props: Props) => {
  const { name, control, rules, defaultValue, ...inputProps } = props;
  const {
    field: { onChange, ...rest },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });

  return (
    <Presentation
      error={error?.message}
      {...rest}
      value={rest.value}
      {...inputProps}
      onChange={(e, _, formattedValue) => {
        if (typeof e === 'string') {
          onChange(formattedValue);
        } else {
          console.warn('Unexpected type of e:', typeof e, e);
        }
      }}
    />
  );
};

export default memo(PhoneInput);
