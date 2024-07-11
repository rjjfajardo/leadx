import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { Asserts } from 'yup';

import { useResponseHandler } from '@/hooks/useResponseHandler';
import yup from '@/lib/yup';
import authApi from '@/store/api/enhancedApi/auth';

type FormValues = Asserts<typeof schema>;

const schema = yup.object().shape({
  personnelName: yup.string().required(),
  password: yup.string().required(),
});

export const useHooks = () => {
  const { handleError } = useResponseHandler();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [loginMutation] = authApi.useAuthControllerLoginMutation();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await loginMutation({ loginRequestDto: { ...values } }).unwrap();
    } catch (e) {
      console.log(e);
      handleError(e);
    }
  };

  return {
    control,
    showPassword,
    handleClickShowPassword,
    login: handleSubmit(onSubmit),
  };
};
