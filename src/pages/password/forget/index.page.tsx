import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useHooks } from 'src/pages/password/forget/hooks';

import Link from '@/components/parts/Link';
import TextInput from '@/components/parts/TextInput';
import NonLoginForm from '@/components/templates/Layout/NonLoginFormLayout';

const ForgotPasswordPage = () => {
  const { control, onSubmit } = useHooks();
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
        Reset your password
      </Box>
      <Box sx={{ color: '#495057', mb: 2 }}>
        To reset your password, please enter the email address you use to log
        in.
      </Box>
      <form onSubmit={onSubmit}>
        <Box
          sx={{
            '& .MuiFormControl-root': {
              width: '100%',
            },
          }}
        >
          <TextInput
            label=""
            type="email"
            name="email"
            control={control}
            placeholder="Email"
            defaultValue=""
            rules={{ required: true }}
            formatType="email"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: '100%', mt: 2, fontWeight: 'bold', color: 'white' }}
        >
          Receive reset link
        </Button>
      </form>
      <Link
        href="/login"
        color="info.main"
        sx={{
          mt: 4,
          textAlign: 'center',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        Back to login
      </Link>
    </NonLoginForm>
  );
};

export default ForgotPasswordPage;
