import Box from '@mui/material/Box';
import { useHooks } from 'src/pages/password/forget/done/hooks';

import { StyledLink } from '@/components/parts/StyledLink';
import NonLoginForm from '@/components/templates/Layout/NonLoginLayout';

function PasswordForgetDonePage() {
  const { router, isReady } = useHooks();

  if (!isReady) return null;

  const email = router.query?.email;
  if (!email) {
    router.push(`/login`);
    return null;
  }

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
        The reset link has been sent!
      </Box>
      <Box sx={{ color: '#495057', mb: 5 }}>
        {`Check your ${email} inbox for an email with instructions on how to reset your password.`}
      </Box>
      <StyledLink href={'/password/forget'}>
        <Box
          component="span"
          sx={{ fontWeight: 'bold', color: '#4a8abc', cursor: 'pointer' }}
        >
          Click here if you made a mistake in your email address
        </Box>
      </StyledLink>

      <StyledLink href={'/login'} color="info.main" sx={{ mt: 3 }}>
        Here is the login page
      </StyledLink>
    </NonLoginForm>
  );
}

export default PasswordForgetDonePage;
