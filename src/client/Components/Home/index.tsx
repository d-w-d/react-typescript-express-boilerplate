import React, { useState, useContext } from 'react';
import { Button, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { authContext } from '@client/Contexts/AuthContext';
import { demoApi } from './demoApi';
import { useStyles } from './styles';
import { simpleUuid } from '@client/Utils/simpleUuid';

export const pingServerButtonId = 'ping-server-button' + simpleUuid();
export const snackBarMessageId = 'snackbar-message-id' + simpleUuid();

export const Home = ({ sth = 'hi' }: { sth?: string }) => {
  // State hooks
  const classes = useStyles();
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const { auth, setAuth, unsetAuth } = useContext(authContext);

  // Event handlers
  const openSnackbar = async () => {
    const result = await demoApi();
    if (!!result.error) {
      setSnackbarMessage(result.message);
    } else {
      setSnackbarMessage(result.data!.test);
    }
  };
  const closeSnackbar = async () => setSnackbarMessage('');

  return (
    <div className={classes.homePageContainer}>
      <h1>Welcome to {`${__SITE_LONG_TITLE__}`} </h1>

      <h2>This is a Subtitle for {`${__SITE_SHORT_TITLE__}`}</h2>

      {!!auth.username ? (
        <WelcomeName name={auth.username} />
      ) : (
        <p>Sign in to access locked resources</p>
      )}

      <Button id={pingServerButtonId} variant="contained" onClick={openSnackbar}>
        Click here to ping server!
      </Button>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={!!snackbarMessage}
        autoHideDuration={6000}
        ContentProps={{
          'aria-describedby': snackBarMessageId
        }}
        message={<span id={snackBarMessageId}>{snackbarMessage}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={closeSnackbar}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
};

const WelcomeName = ({ name }: { name: string }) => (
  <p>
    <span style={{ fontWeight: 'bold' }}>Welcome {name}</span>
  </p>
);
