import FormControl, { FormControlProps } from "@mui/material/FormControl"
import TextField, { TextFieldProps } from "@mui/material/TextField"
import { memo } from "react"

import InputLabel, { InputLabelProps } from "@/components/parts/InputLabel"

export type TextInputFormControlProps = Omit<
  FormControlProps,
  "error" | "disabled"
>

export type TextInputLabelRender = (
  props: Pick<InputLabelProps, "optional" | "required" | "children">
) => JSX.Element

export type TextInputLabelProps = string | TextInputLabelRender

export type TextInputProps = Omit<TextFieldProps, 'error' | 'label'> &
  LabelProps & {
    error?: string
    formControlProps?: TextInputFormControlProps
  }

type LabelProps = {
  hasRequiredLabel?: boolean
  hasOptionalLabel?: boolean
  label?: TextInputLabelProps
}

export const Label = (props: LabelProps): JSX.Element => {
  const { hasRequiredLabel, hasOptionalLabel, label } = props

  if (typeof label === 'string') {
    return (
      <InputLabel required={hasRequiredLabel} optional={hasOptionalLabel}>
        {label}
      </InputLabel>
    )
  }

  if (label) {
    return label({ required: hasRequiredLabel, optional: hasOptionalLabel })
  }

  return <></>
}

const TextInput = (props: TextInputProps) => {
  const {
    label,
    error,
    disabled,
    formControlProps,
    hasRequiredLabel,
    hasOptionalLabel,
    ...rest
  } = props
  const helperText = error ?? undefined

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

      <TextField
        {...rest}
        value={rest.value ?? ''}
        variant="outlined"
        helperText={helperText}
        error={!!error}
        disabled={disabled}
        onWheel={(e) => (e.target as HTMLElement).blur()}
      />
    </FormControl>
  )
}
export default memo(TextInput)
