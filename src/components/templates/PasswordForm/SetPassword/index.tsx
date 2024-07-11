import Box from '@mui/material/Box';

// import Button from '@mui/material/Button'
// import Link from '@/components/parts/Link'
// import TextInput from '@/components/parts/TextInput'
import NonLoginForm from '@/components/templates/Layout/NonLoginLayout';
// import { useHooks } from '@/components/templates/PasswordForm/SetPassword/hooks'

function SetPasswordForm({ type }: { type: 'new' | 'reset' }) {
  const isNew = type === 'new';
  const isReset = type === 'reset';
  // const {
  //   handleSubmit,
  //   control,
  //   // resetToken, isLoading, reset
  // } = useHooks()

  // if (isLoading) return null;
  // if (!isLoading && !resetToken) {
  //   return (
  //     <NonLoginForm>
  //       <Link href="/password/forget">
  //         <Box
  //           component="span"
  //           sx={{
  //             color: '#4a8abc',
  //             cursor: 'pointer',
  //             textAlign: 'center',
  //           }}
  //         >
  //           Please try again from here
  //         </Box>
  //       </Link>
  //     </NonLoginForm>
  //   );
  // }

  return (
    <NonLoginForm>
      <Box
        sx={{
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        {isNew
          ? 'Create your password'
          : isReset
            ? 'Reset your password'
            : null}
      </Box>

      <Box sx={{ color: '#495057', mb: 2 }}>
        Enter the new password for your account.
      </Box>
      {/* <form onSubmit={handleSubmit(reset)}>
        <Box
          sx={{
            '& .MuiFormControl-root': {
              width: '100%',
            },
          }}
        >
          <TextInput
            label={'Email'}
            name="email"
            control={control}
            placeholder={'Email'}
            value={resetToken?.user?.email}
            disabled
            formatType="email"
          />
        </Box>
        <Box
          sx={{
            '& .MuiFormControl-root': {
              width: '100%',
            },
            mt: 5,
          }}
        >
          <TextInput
            label={'Password'}
            type="password"
            name="password"
            control={control}
            placeholder={'New Password'}
            rules={{ required: true }}
          />
        </Box>

        <Box
          sx={{
            '& .MuiFormControl-root': {
              width: '100%',
            },
            mt: 5,
          }}
        >
          <TextInput
            label={'Re-enter your password'}
            type="password"
            name="confirm"
            control={control}
            placeholder={'New Password'}
            rules={{ required: true }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: '100%', mt: 2, fontWeight: 'bold' }}
        >
          {isNew ? 'Create password' : isReset ? 'Change password' : 'Submit'}
        </Button>
      </form> */}
    </NonLoginForm>
  );
}

export default SetPasswordForm;
