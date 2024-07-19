import {
  Box,
  Button,
  Card,
  Container,
  Snackbar,
  Stack,
  styled,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import MuiAlert from '@mui/material/Alert';
import { useAuth } from 'src/utils/auth';
import { useNavigate } from 'react-router';
import { NavLink as RouterLink } from 'react-router-dom';

const MainContent = styled(Box)(
  () => `
  height: 100%;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center
`
);

const SignUp = () => {
  const navigate = useNavigate();

  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const { handleSignUp } = useAuth();

  const handleSignUpBtn = async () => {
    if (nameInput == '' || emailInput == '' || passwordInput == '') {
      setSnackBarMessage('Preencha todos os campos!');
      return;
    }

    const requestSignUp = await handleSignUp(
      nameInput,
      emailInput,
      passwordInput
    );

    if (requestSignUp.detail) {
      setSnackBarMessage(' Email e/ou senha incorreto(s)');
      return;
    }

    // Redirect on success
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Criar Empresa</title>
      </Helmet>

      <Snackbar
        open={snackBarMessage != ''}
        autoHideDuration={6000}
        onClose={() => setSnackBarMessage('')}
      >
        <MuiAlert style={{ color: 'whitesmoke' }} severity="error">
          {snackBarMessage}
        </MuiAlert>
      </Snackbar>

      <MainContent>
        <Container maxWidth="sm">
          <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
            <Stack spacing={3}>
              <TextField
                label="Seu nome"
                type="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />

              <TextField
                label="Seu email"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />

              <TextField
                label="Sua senha"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              <Button
                onClick={handleSignUpBtn}
                variant="outlined"
                style={{ marginTop: 40 }}
              >
                Criar Empresa
              </Button>
            </Stack>
          </Card>
          <Button
            disableRipple
            fullWidth
            component={RouterLink}
            sx={{ mt: 3 }}
            to="/signin"
          >
            Entrar
          </Button>
        </Container>
      </MainContent>
    </>
  );
};

export default SignUp;
