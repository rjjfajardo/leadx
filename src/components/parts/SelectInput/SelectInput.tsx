/* eslint-disable */
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete, {
  AutocompleteProps,
  createFilterOptions,
} from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { InputProps as InputPropsType } from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { PaperProps } from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { FilterOptionsState } from '@mui/material/useAutocomplete';
import { SxProps, Theme } from '@mui/system';
import React, { memo, useEffect, useMemo, useState } from 'react';

import InputLabel from '@/components/parts/InputLabel';

export type SelectFormControlProps = Omit<
  FormControlProps,
  'error' | 'disabled'
>;

export interface Option {
  id: string | number | boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * @property multiple -
 * @property selectChangedHandler-
 * @property onClickAdd -
 * @property searchIcon -
 * @see Autocomplete API https://mui.com/material-ui/api/autocomplete/
 */
export type SelectInputProps = {
  error?: string;
  label?: string;
  multiline?: boolean;
  hasRequiredLabel?: boolean;
  formControlProps?: SelectFormControlProps;
  placeholder?: string;
  /**
   * Allows for disable portal.
   * If set to `true`, the dropdown can be rendered inside the html body element.
   */
  disablePortal?: boolean;
  /**
   * Allows for multiple selection of options.
   * If set to `true`, `searchIcon` is ignored and search text cannot be used.
   * @see {@link Option}
   */
  multiple?: boolean;
  inputRef?: React.RefObject<HTMLElement>;
  value?: string | number | boolean | (string | number | boolean)[];
  name?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (v: any, o: any) => void;
  /**
   * Determines if an option is disabled
   * @see {@link Option}
   *
   * @param value - `Option` value
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOptionDisabled?: (value: any) => boolean;
  /**
   * An array of possible option values.
   * @see {@link Option}
   */
  options: Option[];
  /**
   * Removes the X button to clear the input.
   */
  disableClearable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOptionLabel?: (option: any) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentsProps?: { paper: { sx: PaperProps<'div', any> | undefined } };
  /**
   * When specified, a button will be shown below the "no results text".
   * This property specifies an event handler for its click handler.
   *
   * @param text - value of the input when button is clicked
   */
  onClickAdd?: (text: string) => void;
  /**
   * onClickAdd button label
   */
  onClickAddLabel?: string;

  /**
   * Allows passing properties to the inner input component.
   *
   * @see {@link InputPropsType}
   */
  InputProps?: InputPropsType;
  searchIcon?: boolean;
  /** When there is a possibility that the value does not exist among the currently available options, such as to display past values, pass availableOptions separately from options to support display in input */
  availableOptions?: Option[];

  /** Pass when filtering on the server side */
  filterOnServer?: boolean;

  /** Custom filter for autocomplete */
  filterOptions?: (
    options: Option[],
    state?: FilterOptionsState<Option>,
  ) => Option[];
  /**
   * Optional SX styling for the search icon
   */
  searchIconSx?: SxProps<Theme>;
  /**
   * Optional SX styling for the inputAdornment component that wraps the search icon
   */
  searchIconAdornmentSx?: SxProps<Theme>;
} & Pick<
  AutocompleteProps<Option, boolean, boolean, boolean>,
  | 'loading'
  | 'onInputChange'
  | 'freeSolo'
  | 'disablePortal'
  | 'fullWidth'
  | 'inputValue'
  | 'id'
  | 'renderOption'
  | 'open'
  | 'onClose'
  | 'disabled'
  | 'autoSelect'
  | 'renderTags'
  | 'clearOnBlur'
  | 'groupBy'
  | 'renderGroup'
  | 'sx'
  | 'blurOnSelect'
  | 'ListboxProps'
  | 'readOnly'
>;

const SelectInput = (props: SelectInputProps) => {
  const {
    label,
    error,
    multiline,
    placeholder,
    disabled,
    formControlProps,
    options = [],
    hasRequiredLabel,
    value,
    multiple,
    disablePortal,
    name,
    onChange,
    onInputChange,
    componentsProps,
    getOptionDisabled,
    onClickAdd,
    onClickAddLabel,
    InputProps,
    searchIcon,
    availableOptions,
    filterOnServer,
    filterOptions: customFilterOptions,
    searchIconSx,
    searchIconAdornmentSx,
    ...rest
  } = props;
  const helperText = error ?? undefined;
  const showSearchIcon = !multiple && searchIcon;

  const [searchText, setSearchText] = useState<string>('');
  const [autocompleteValue, setAutocompleteValue] = useState<
    Option | Option[] | undefined
  >(multiple ? [] : undefined);

  useEffect(() => {
    const isArray = Array.isArray(value);

    if (isArray || multiple) {
      const selectedOptions = isArray
        ? options.filter((o) => value.includes(o.id))
        : [];
      setAutocompleteValue(selectedOptions);
      return;
    }

    const selectedOption = options.find((o) => value === o.id);

    // Set only if there is a difference from the currently set item
    if (
      !value ||
      !autocompleteValue ||
      (selectedOption &&
        'id' in autocompleteValue &&
        autocompleteValue?.id !== selectedOption.id)
    ) {
      setAutocompleteValue(selectedOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, options]);

  const filterOptions = useMemo(() => {
    /** If filtered on the server side, do not filter on FE */

    if (filterOnServer) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (o) => o;
    }

    if (customFilterOptions) {
      return customFilterOptions;
    }

    return createFilterOptions({
      stringify: (option: Option) => {
        return [
          rest?.getOptionLabel?.(option) || option.label,
          option.secondaryLabel,
          option.searchText,
        ]
          .filter((v) => v)
          .join(' ');
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rest?.getOptionLabel, filterOnServer]);

  return (
    <FormControl
      error={!!error}
      disabled={disabled}
      fullWidth
      {...formControlProps}
    >
      <InputLabel required={hasRequiredLabel}>{label}</InputLabel>

      <Autocomplete
        disablePortal={disablePortal}
        autoHighlight
        disabled={disabled}
        multiple={multiple}
        disableCloseOnSelect={multiple}
        options={availableOptions ?? options}
        /** || Make it a controlled input by making it null */ value={
          autocompleteValue || null
        }
        isOptionEqualToValue={(option, value) =>
          Array.isArray(value)
            ? value.includes(option.id)
            : option.id === value.id
        }
        getOptionLabel={(
          option: Option | string /* Can be string in case of freeSolo */,
        ) => (typeof option === 'string' ? option : option.label?.toString())} // MUI requires this to be a string, When it's not a string MUI throws an error and the initial state of the selection is blank.
        getOptionDisabled={getOptionDisabled}
        groupBy={(option: Option) => option.group}
        renderInput={(params) => (
          <TextField
            inputRef={props.inputRef}
            multiline={multiline}
            placeholder={placeholder}
            error={!!error}
            {...params}
            InputProps={{
              ...params.InputProps,
              ...(showSearchIcon && {
                startAdornment: (
                  <InputAdornment position="start" sx={searchIconAdornmentSx}>
                    <SearchIcon sx={searchIconSx} />
                  </InputAdornment>
                ),
              }),
              ...InputProps,
            }}
          />
        )}
        name={name}
        onChange={(e, option) => {
          if (onChange) {
            if (Array.isArray(option)) {
              onChange(
                option.map((o) => o.id),
                option,
              );
            } else {
              onChange(option?.id ?? null, option);
            }
          }
        }}
        componentsProps={componentsProps}
        filterOptions={filterOptions}
        onInputChange={(event, value, reason) => {
          !multiple && setSearchText?.(value);
          onInputChange?.(event, value, reason);
        }}
        noOptionsText={
          <>
            <Box
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                mb: 2,
                fontSize: 18,
              }}
            >
              Search Result 0
            </Box>
            {onClickAdd && (
              <Button
                variant="outlined"
                startIcon={<AddIcon fontSize="small" />}
                onClick={() => onClickAdd(searchText)}
              >
                {onClickAddLabel || 'Create'}
              </Button>
            )}
          </>
        }
        {...rest}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
export default memo(SelectInput);
