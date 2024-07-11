import { useForm } from 'react-hook-form';

export const useHooks = () => {
  const { control } = useForm();

  return { control };
};
