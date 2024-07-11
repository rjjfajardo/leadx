import { useController, useFormContext } from 'react-hook-form';

import Presentation, {
  CheckBoxListProps as DefaultCheckBoxListProps,
} from './CheckBoxList';

type CheckBoxListProps = Omit<
  DefaultCheckBoxListProps,
  'control' | 'watch' | 'setValue' | 'getValues' | 't'
>;

/**
 * Renders a multiple checkbox control.
 *
 * @param props - @See {@link CheckBoxListProps}
 */
const CheckBoxList = (props: CheckBoxListProps) => {
  const { name, ...inputProps } = props;
  const { control } = useFormContext();
  const {
    field: { ref, onChange, value, ...rest },
  } = useController({ name, control });

  return (
    <Presentation
      inputRef={ref}
      {...inputProps}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
};

export default CheckBoxList;
