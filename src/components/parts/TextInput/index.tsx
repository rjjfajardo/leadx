import { memo } from 'react';
import type { Control, RegisterOptions } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { TextInputLabelProps, TextInputProps } from './TextInput';
import Presentation from './TextInput';

export type FormatType = 'phone' | 'email' | 'zenhan' | 'zipcode';

export type Props = Omit<TextInputProps, 'label' | 't' | 'onChange'> & {
  label?: TextInputLabelProps;
  name: string;
  onChange?: (v: string | number | boolean) => void;
  control: Control<any>;
  rules?: RegisterOptions;
  defaultValue?: string | null;
  formatType?: FormatType;
  parse?: (v: string | number | boolean) => string;
  format?: (v: string) => string | number | boolean;
};

const TextInput = (props: Props) => {
  const {
    name,
    control,
    rules,
    defaultValue,
    formatType,
    parse,
    format,
    ...inputProps
  } = props;
  const {
    field: { ref, ...rest },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });

  return (
    <Presentation
      inputRef={ref}
      error={error?.message}
      {...rest}
      value={parse ? parse(rest.value) : rest.value}
      {...inputProps}
      onChange={(e) => {
        const v = e.target.value;
        rest.onChange(format ? format(v) : v);
        inputProps.onChange?.(format ? format(v) : v);
      }}
    />
  );
};

export default memo(TextInput);
