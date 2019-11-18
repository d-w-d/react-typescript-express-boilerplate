import * as React from 'react';
import { Redirect } from 'react-router';
import { TextField, Button, Paper } from '@material-ui/core';

import { useErrorHandler } from '@client/CustomHooks/errorHandler';
import { validateForm, IUserDetails } from './validateForm';
import { authContext } from '@client/Contexts/AuthContext';
import { signInOrUpApi } from './signInOrUpApi';
import { ErrorMessage } from './ErrorMessage';
import { simpleUuid } from '@client/Utils/simpleUuid';
import { useStyles } from './styles';
import { Link } from 'react-router-dom';
import { Odnoklassniki } from 'mdi-material-ui';

// Unique ids:
export const signInOrUpButtonId = 'sign-in-or-up-button' + simpleUuid();
export const signInOrUpFormId = 'sign-in-or-up-form' + simpleUuid();
export const usernameInputId = 'username-input' + simpleUuid();
export const passwordInputId = 'password-input' + simpleUuid();
export const password2InputId = 'password2-input' + simpleUuid();
export const signInOrUpTogglerId = 'sign-in-or-up-toggler' + simpleUuid();

export const SignInOrUp = (props: { isSigningIn?: boolean }) => {
  const classes = useStyles();
  const [userDetails, setUserDetails] = React.useState<IUserDetails>({
    username: '',
    password: '',
    password2: ''
  });
  const [isSigningIn, setIsSigningIn] = React.useState<boolean>(!!props.isSigningIn);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { auth, setAuth } = React.useContext(authContext);
  const { error, showError } = useErrorHandler(null);

  const authHandler = async () => {
    setIsLoading(true);
    const result = await signInOrUpApi(userDetails, isSigningIn);
    setIsLoading(false);
    if (!!result.error) {
      showError(result.message);
      setUserDetails(old => ({ ...old, password: '', password2: '' }));
    } else {
      if (!!result.data) {
        setAuth(result.data);
      }
    }
  };

  React.useEffect(() => {}, [userDetails]);

  const { username, password, password2 } = userDetails;

  if (auth.username) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.container}>
      <h1 style={{ textAlign: 'center' }}> {isSigningIn ? `Sign In ` : `Sign Up `}</h1>

      <h3 style={{ textAlign: 'center', color: 'grey' }}>
        {isSigningIn ? <span>{'Or '}</span> : <span>{'Already have an account? '}</span>}

        <span
          id={signInOrUpTogglerId}
          onClick={() => {
            setUserDetails(details => ({ ...details, password: '', password2: '' }));
            setIsSigningIn(old => !old);
          }}
        >
          <Link
            id={signInOrUpTogglerId}
            style={{
              fontSize: 'inherit',
              color: 'inherit'
              // textDecoration: 'none'
            }}
            to={isSigningIn ? '/signup' : '/signin'}
          >
            {isSigningIn ? <span>{'create account'}</span> : <span>{'Sign in '}</span>}
          </Link>
        </span>
      </h3>

      <Paper style={{ maxWidth: '80%', width: '80%' }}>
        <form
          id={signInOrUpFormId}
          onSubmit={e => {
            e.preventDefault();
            if (!!validateForm(userDetails, isSigningIn, showError)) {
              authHandler();
            }
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className={classes.container}
          noValidate
          autoComplete="off"
        >
          <TextField
            className={classes.textField}
            required
            id={usernameInputId}
            label="Username"
            type="text"
            name="username"
            value={username}
            placeholder="user"
            margin="normal"
            onChange={e => setUserDetails({ ...userDetails, username: e.target.value })}
          />
          <TextField
            className={classes.textField}
            required
            id={passwordInputId}
            label="Password"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            margin="normal"
            onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
          />
          {!isSigningIn && (
            <TextField
              className={classes.textField}
              required
              id={password2InputId}
              label="Retype Password"
              type="password"
              name="password2"
              value={password2}
              placeholder="Password"
              margin="normal"
              onChange={e => setUserDetails({ ...userDetails, password2: e.target.value })}
            />
          )}
          <Button
            id={signInOrUpButtonId}
            variant="contained"
            type="submit"
            className={classes.button}
            disabled={isLoading}
            style={{ marginBottom: 20 }}
          >
            {isLoading ? 'Loading...' : isSigningIn ? 'Sign In' : 'Sign Up'}
          </Button>
        </form>
      </Paper>
      {error && <ErrorMessage errorMessage={error} />}
    </div>
  );
};
