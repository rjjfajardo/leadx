import MuiFormLabel, { FormLabelProps } from '@mui/material/FormLabel';
import { styled } from '@mui/material/styles';
import { ComponentProps, memo } from 'react';

const FormLabel = styled(MuiFormLabel)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  lineHeight: '22px',
  padding: theme.spacing(0, 0.5),
  fontSize: 12,
  '&.Mui-disabled': {
    color: theme.palette.common.white,
  },
  '.MuiFormLabel-asterisk': {
    display: 'none',
  },
}));

interface ValidationLabelProps extends Pick<FormLabelProps, 'sx'> {
  /**
   * Label Text
   */
  label: string;
  /**
   * A class name to apply to the element.
   *
   * @see {@link [Reusable component on MUI's docs](https://mui.com/material-ui/customization/how-to-customize/#2-reusable-component)}
   */
  className?: string;
}

const ValidationLabel = (props: ValidationLabelProps) => {
  const { label, sx, className } = props;
  return (
    <FormLabel className={className} sx={sx} focused={false} error={false}>
      {label}
    </FormLabel>
  );
};

const _RequiredLabel = styled(ValidationLabel)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 18,
  fontWeight: 'bold',
}));

export const RequiredLabel = memo(
  (props: Omit<ComponentProps<typeof _RequiredLabel>, 'label'>) => {
    return <_RequiredLabel {...props} label="*" />;
  },
);

const _OptionalLabel = styled(ValidationLabel)(({ theme }) => ({
  color: theme.palette.grey[900],
  bgcolor: theme.palette.grey[300],
}));
export const OptionalLabel = memo(
  (props: Omit<ComponentProps<typeof _RequiredLabel>, 'label'>) => {
    return <_OptionalLabel {...props} label="Optional" />;
  },
);

export default memo(ValidationLabel);
