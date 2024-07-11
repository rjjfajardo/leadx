import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Link from '@/components/parts/Link';
import TextInput from '@/components/parts/TextInput';
import NonLoginForm from '@/components/templates/Layout/NonLoginFormLayout';
import { useHooks } from '@/pages/login/hooks';

const LoginPage = () => {
  const { control, showPassword, handleClickShowPassword, login } = useHooks();
  return (
    <NonLoginForm>
      <Box
        sx={{
          textAlign: 'center',
          fontSize: 18,
          mb: 2,
        }}
      >
        Sign In
      </Box>
      <form onSubmit={login}>
        <Box
          sx={{
            '& .MuiFormControl-root': {
              width: '100%',
            },
          }}
        >
          <TextInput
            label=""
            name="personnelName"
            control={control}
            rules={{ required: true }}
            placeholder="Username"
            // Set the defaultValue to resolve "Warning: A component is changing an uncontrolled input of type text to be controlled."
            // https://github.com/react-hook-form/documentation/issues/133
            defaultValue=""
            sx={{
              '.MuiInputBase-input': {
                padding: 2,
              },
            }}
          />
        </Box>
        <Box
          sx={{
            '& .MuiFormControl-root': {
              width: '100%',
            },
            mt: 2,
          }}
        >
          <TextInput
            label=""
            type={showPassword ? 'text' : 'password'}
            name="password"
            control={control}
            rules={{ required: true }}
            placeholder="Password"
            // Set the defaultValue to resolve "Warning: A component is changing an uncontrolled input of type text to be controlled."
            // https://github.com/react-hook-form/documentation/issues/133
            defaultValue=""
            sx={{
              '.MuiInputBase-input': {
                padding: 2,
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: '100%', mt: 3, fontWeight: 'bold', color: 'white' }}
        >
          Sign In
        </Button>
      </form>
      <Link
        href="/password/forget"
        color="info.main"
        sx={{
          mt: 3,
          textAlign: 'center',
        }}
      >
        Forgot Password
      </Link>
    </NonLoginForm>
  );
};

export default LoginPage;
