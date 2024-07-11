import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import yup from '@/lib/yup';

//TODO
export function useHooks() {
  // const router = useRouter();
  // const { handleError } = useResponseHandler();

  // const token = router.query?.resetToken;

  // const { resetToken, isLoading } = useResetToken(token as string);

  const schema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters')
      .matches(
        /[a-z]+/,
        'Password must contain at least one lowercase character',
      )
      .matches(
        /[A-Z]+/,
        'Password must contain at least one uppercase character',
      )
      .matches(
        /[@$!%*#?&]+/,
        'Password must contain at least one special character',
      )
      .matches(/\d+/, 'Password must contain at least one number')
      .required(),
    confirm: yup
      .string()
      .required()
      .oneOf([yup.ref('password')], 'Password not matched'),
  });

  type FormValues = yup.InferType<typeof schema>;

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { password: '', confirm: '' },
  });

  // const [resetPassword] =
  //   userApi.useUsersPublicControllerResetPasswordMutation();

  // const reset = async (values: FormValues) => {
  //   const body = {
  //     password: values.password,
  //     token: resetToken?.token,
  //   } as ResetPasswordDto;
  //   try {
  //     await resetPassword({ resetPasswordDto: body }).unwrap();

  //     if (isNew) {
  //       router.push('/password/new/done');
  //     } else if (isReset) {
  //       router.push('/password/reset/done');
  //     } else {
  //       router.push('/login');
  //     }
  //   } catch (e) {
  //     handleError(e);
  //     if (isReset) {
  //       router.push('/password/forget');
  //     } else {
  //       router.push('/login');
  //     }
  //   }
  // }

  return {
    handleSubmit,
    control,
    // resetToken,
    // isLoading,
    // reset,
  };
}
