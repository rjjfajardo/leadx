import { yupResolver } from '@hookform/resolvers/yup';
// import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

// import { useResponseHandler } from '@/hooks/useResponseHandler'
import yup from '@/lib/yup';
// import { userApi } from '@/store/enhancedApi'

type FormValues = {
  email: string;
};
const schema = yup.object().shape({
  email: yup.string().required().email(),
});

export function useHooks() {
  // const { handleError, handleSuccess } = useResponseHandler()
  // const router = useRouter();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  // const [forgetPassword] =
  //   userApi.useUsersPublicControllerForgetPasswordMutation()

  async function forget(values: FormValues) {
    console.log(values);
    // try {
    //   await forgetPassword({ checkEmailDto: { ...values } })
    //   router.push({
    //     pathname: '/password/forget/done',
    //     query: {
    //       ...values,
    //     },
    //   })
    //   handleSuccess(
    //     'We have sent you a reset link to the email you provided. Please check your inbox.'
    //   )
    // } catch (e) {
    //   handleError(e)
    // }
  }
  return { onSubmit: handleSubmit(forget), control };
}
