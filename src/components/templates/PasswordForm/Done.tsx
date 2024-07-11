import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { StyledLink } from '@/components/parts/StyledLink';
import NonLoginForm from '@/components/templates/Layout/NonLoginLayout';

interface PasswordFormDoneProps {
  title: string;
}

function PasswordFormDone(props: PasswordFormDoneProps) {
  const { title } = props;

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
        {title}
      </Box>
      <StyledLink href="/login">
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '100%', mt: 2, fontWeight: 'bold' }}
        >
          Login
        </Button>
      </StyledLink>
    </NonLoginForm>
  );
}

export default PasswordFormDone;
