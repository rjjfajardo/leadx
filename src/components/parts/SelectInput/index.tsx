import { FilterOptionsState } from '@mui/base';
import { createFilterOptions } from '@mui/material/Autocomplete';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import isEqual from 'lodash.isequal';
import { KeyboardEvent, memo, useEffect, useState } from 'react';
import type { Control, RegisterOptions } from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { Option, SelectInputProps } from './SelectInput';
import Presentation from './SelectInput';

export type { Option } from './SelectInput';

export type Props = Omit<SelectInputProps, 't'> & {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
  defaultValue?: string | number | boolean | string[];
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

const SelectInput = (props: Props) => {
  const { name, control, rules, defaultValue, ...inputProps } = props;
  const {
    field: { ref, ...rest },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });
  const firstError = Array.isArray(error) ? error.filter((e) => !!e)[0] : error;

  const [options, setOptions] = useState<Option[]>([]);

  // Every time the instance is updated, even if the contents of props.options do not change
  // autocompleteValue The reconfiguration process will run, so update only if there is a difference.
  useEffect(() => {
    if (isEqual(options, props.options)) return;
    setOptions(props.options);
  }, [props.options]);

  return (
    <Presentation
      error={firstError?.message}
      {...rest}
      {...inputProps}
      options={options}
      onChange={(...args) => {
        rest.onChange(...args);
        inputProps.onChange?.(...args);
      }}
    />
  );
};

export default memo(SelectInput);
export type { SelectInputProps };

export const multilineOption = (label: string, ...keys: string[]) => ({
  getOptionLabel: (option: Option) => option[label],
  renderOption: (props, option) => (
    <MenuItem {...props}>
      <ListItemText
        primary={option[label]}
        secondary={keys.map((key) => option[key]).join(' ')}
      />
    </MenuItem>
  ),
  filterOptions: getFilterOptionsByKeys(label, ...keys),
});

export const getFilterOptionsByKeys =
  (...keys: string[]) =>
  (options: Option[], params: FilterOptionsState<Option>) =>
    createFilterOptions({
      stringify: (option: Option) => keys.map((key) => option[key]).join(' '),
    })(options, params);
