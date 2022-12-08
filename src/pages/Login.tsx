import { useRef } from 'react';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useToggle } from '../hooks/useToggle';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword, signInWithGoogle, registerWithEmailAndPassword } from '../api/firebase';
import login_background from '../assets/images/login_background.gif';

const Login = (): JSX.Element => {
  const [user,,error] = useAuthState(auth);

  const [showSignUp, setShowSignUp] = useToggle(false);
  const [showError, setShowError] = useToggle(false);
  const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useToggle(false);


  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  if (user && !error) {
    navigate('/');
  }

  return (
    <Box
      sx={{
        backgroundImage: `url(${login_background})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowError(false)} severity="success" sx={{ width: '100%' }}>
          {error && <span>{error.message}</span>}
        </Alert>
      </Snackbar>

      <Grid
        container
        direction="row"
      >
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              opacity: 0.9,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              mr: 4,
              ml: 4,
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                The Beauty of Space
              </Typography>
              <Typography variant="body1" gutterBottom>
                A collection of pages using NASA's APIs to display images and information about space.
                Please take a look around and enjoy the beauty of space. You can check out this project
                on <a href="https://github.com/Ricky-ClarkIII/Space">GitHub</a>.
              </Typography>
              <Typography variant="body1" gutterBottom>
                {error && <span>{error.message}</span>}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              opacity: 0.9,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              mr: 4,
              ml: 4,
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '50%',
              }}
            >
              { !showSignUp ? (
                <>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Login
                  </Typography>
                  <TextField
                    autoFocus
                    variant="standard"
                    type="email"
                    placeholder="Email"
                    fullWidth
                    sx={{ mb: 2 }}
                    inputRef={emailRef}
                  />
                  <TextField
                    type="password"
                    variant="standard"
                    placeholder="Password"
                    fullWidth
                    sx={{ mb: 2 }}
                    inputRef={passwordRef}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mb: 2 }}
                    onClick={() => {
                      if (emailRef.current && passwordRef.current) {
                        logInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
                      }
                    }}
                  >
                    Login
                  </Button>
                  <Stack direction="row" spacing={2}>
                    <IconButton
                      onClick={() => signInWithGoogle()}
                    >
                      <GoogleIcon />
                    </IconButton>
                    <IconButton disabled>
                      <FacebookIcon />
                    </IconButton>
                    <IconButton disabled>
                      <GitHubIcon />
                    </IconButton>
                  </Stack>
                </>
              ) : (
                <>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Sign Up
                  </Typography>
                  <TextField
                    type="text"
                    variant="standard"
                    placeholder="Name"
                    fullWidth
                    sx={{ mb: 2 }}
                    inputRef={nameRef}
                  />
                  <TextField
                    type="email"
                    variant="standard"
                    placeholder="Email"
                    fullWidth
                    sx={{ mb: 2 }}
                    inputRef={emailRef}
                  />
                  <TextField
                    type="password"
                    variant="standard"
                    placeholder="Password"
                    fullWidth
                    sx={{ mb: 2 }}
                    inputRef={passwordRef}
                    error={passwordsDoNotMatch}
                  />
                  <TextField
                    type="password"
                    variant="standard"
                    placeholder="Confirm Password"
                    fullWidth
                    sx={{ mb: 2 }}
                    inputRef={confirmPasswordRef}
                    error={passwordsDoNotMatch}
                    label={passwordsDoNotMatch ? 'Passwords do not match' : ''}
                  />
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mb: 2 }}
                    onClick={() => {
                      if (nameRef.current && emailRef.current && passwordRef.current && confirmPasswordRef.current) {
                        if (passwordRef.current.value === confirmPasswordRef.current.value) {
                          setPasswordsDoNotMatch(false);
                          registerWithEmailAndPassword(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
                        } else {
                          setPasswordsDoNotMatch(true);
                        }
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </CardContent>
            <CardActions
              sx={{
                textAlign: 'right',
              }}
            >
              <Typography
                variant="body2"
                component="p"
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => setShowSignUp(!showSignUp)}
              >
                {showSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;