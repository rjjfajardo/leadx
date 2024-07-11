import FormLabel from "@mui/material/FormLabel"
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"
import type { SxProps, Theme } from "@mui/system"
import type { PropsWithChildren } from "react"

import HelpToolTipIcon from "@/components/parts/HelpToolTipIcon"
import {
  OptionalLabel,
  RequiredLabel,
} from "@/components/parts/ValidationLabel"

const Label = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 14,
  lineHeight: "22px",
  // fontWeight: "bold",
  "&.Mui-focused": {
    color: theme.palette.text.primary,
  },
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
}))

const InputLabelWrapper = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
}))

export type InputLabelProps = PropsWithChildren<{
  required?: boolean
  optional?: boolean
  help?: string
  sx?: SxProps<Theme>
}>

const InputLabel = (props: InputLabelProps) => {
  const { children, help, required = false, optional = false, sx } = props

  if (!children && !required && !optional) return null

  return (
    <InputLabelWrapper direction="row" alignItems="center" sx={sx}>
      {children && <Label className="InputLabelBase">{children}</Label>}
      {help && <HelpToolTipIcon title={help} />}
      {required ? (
        <RequiredLabel sx={{ flexShrink: 0 }} className="RequiredLabel" />
      ) : optional ? (
        <OptionalLabel sx={{ flexShrink: 0 }} className="OptionalLabel" />
      ) : null}
    </InputLabelWrapper>
  )
}

export default InputLabel
