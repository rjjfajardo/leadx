import type { Control, RegisterOptions } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { CheckBoxInputProps as FullCheckBoxInputProps } from './CheckBoxInput';
import Presentation from './CheckBoxInput';

interface CheckBoxInputProps extends FullCheckBoxInputProps {
  /**
   * Name of the form input.
   */
  name: string;
  /**
   * React Hook Form control object.
   * @see {@link https://react-hook-form.com/api#useController}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  /**
   * React Hook Form validation rules.
   * @see {@link https://react-hook-form.com/api#register}
   */
  rules?: RegisterOptions;
  /**
   * Label of the checkbox.
   */
  label?: string;
  /**
   * Default value of the checkbox.
   */
  defaultValue?: boolean;
}

/**
 * A checkbox form input component.
 *
 * @param props - See {@link CheckBoxInputProps}
 */
const CheckBoxInput = (props: CheckBoxInputProps) => {
  const { name, control, rules, defaultValue, label, ...inputProps } = props;
  const {
    field: { ref, ...rest },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });

  return (
    <Presentation
      inputRef={ref}
      error={error?.message}
      label={label}
      {...rest}
      {...inputProps}
      onChange={(...args) => {
        rest.onChange(...args);
        inputProps.onChange?.(...args);
      }}
    />
  );
};

export default CheckBoxInput;
