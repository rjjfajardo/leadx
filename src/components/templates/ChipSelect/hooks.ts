import type { SelectChangeEvent } from '@mui/material/Select';

export interface ChipSelectProps {
  label: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}
export interface HooksProps {
  statusOptions: ChipSelectProps[];
}
export const useHooks = ({ statusOptions }: HooksProps) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedLabel = event.target.value as string;
    const selectedOption = statusOptions.find(
      (option) => option.label === selectedLabel,
    );
    if (selectedOption && selectedOption.onClick && !selectedOption.disabled) {
      selectedOption.onClick();
    }
  };

  return {
    handleChange,
  };
};
