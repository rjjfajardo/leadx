import type { Control, RegisterOptions } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { RadioGroupInputProps } from './RadioGroupInput';
import Presentation from './RadioGroupInput';

/**
 * Properties for {@link RadioGroupInput}.
 */
type RadioGroupInputFieldProps = Omit<RadioGroupInputProps, 't' | 'value'> & {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
  /**
   * Takes a value and parses it into a into something that can be used as form input value.
   * @param v - value to convert to
   */
  parse?: (v: string | number | boolean) => string;
  /**
   * Takes a value and formats it into a into a value that can be used within business logic.
   *
   * @see `parse` since `format` is the inverse of `parse`.
   * @param v - value to convert from
   */
  format?: (v: string) => string | number | boolean;
};

/**
 * Renders a radio group input using MUI components and react-hook-form.
 * @see {@link https://mui.com/components/radio-buttons/}
 *
 * @param props - See {@link RadioGroupInputFieldProps}
 */
const RadioGroupInput = (props: RadioGroupInputFieldProps) => {
  const {
    name,
    control,
    parse = (v) => v,
    format = (v) => v,
    rules,
    defaultValue,
    ...inputProps
  } = props;

  const {
    field: { ref, value, onChange, ...rest },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });

  return (
    <Presentation
      error={error?.message}
      value={parse(value)}
      onChange={(e) => onChange(format(e.target.value))}
      {...rest}
      {...inputProps}
    />
  );
};

export default RadioGroupInput;
