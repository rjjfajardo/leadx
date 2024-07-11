import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@mui/material/ToggleButtonGroup';
import { SxProps } from '@mui/system';
import { ReactNode } from 'react';

import Tooltip from '@/components/parts/Tooltip';

interface SwitchModeButtonProps<M extends string> {
  value: M | undefined;
  onChange: (newMode: M) => void;
  buttons: {
    value: M;
    label: ReactNode;
    sx?: SxProps;
  }[];
  sx?: SxProps;
  toggleButtonGroupProps: ToggleButtonGroupProps;
}

const SwitchModeButton = <M extends string>(
  props: SwitchModeButtonProps<M>,
) => {
  const { value, onChange, buttons, sx, toggleButtonGroupProps } = props;

  return (
    <ToggleButtonGroup
      value={value}
      onChange={(e, newValue) => {
        if (!newValue) return;
        onChange(newValue);
      }}
      sx={sx}
      exclusive
      {...toggleButtonGroupProps}
    >
      {buttons.map((button) => (
        <Tooltip key={button.value} title={button.value}>
          <ToggleButton value={button.value} sx={button.sx}>
            {button.label}
          </ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
};
export default SwitchModeButton;
