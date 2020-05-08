import React, { useState, useContext } from 'react';
import { Button, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { authContext } from '@client/Contexts/AuthContext';
import { demoApi } from './demoApi';
import { useStyles } from './styles';
import { simpleUuid } from '@client/Utils/simpleUuid';
import { Link } from 'react-router-dom';

export const pingServerButtonId = 'ping-server-button' + simpleUuid();
export const snackBarMessageId = 'snackbar-message-id' + simpleUuid();

export const Home = ({ sth = 'hi' }: { sth?: string }) => {
  // State hooks
  const classes = useStyles();
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const { auth, setAuth, unsetAuth } = useContext(authContext);

  const xxx = {
    urls: [
      'https://pds-smallbodies.astro.umd.edu/data_sb/missions/ihw/index.shtml',
      'https://pds-smallbodies.astro.umd.edu/data_sb/missions/ihw/index.shtml',
      '',
      '',
      '',
      ''
    ],
    images: ['', '', '', '', '', '', '']
  };

  const yyy = [1, 2, 3];
  yyy[0];

  const zzz = xxx.urls;

  return (
    <div className={classes.homePageContainer}>
      <h1> Mock Content Page</h1>

      {xxx.urls.map((el, ind) => (
        <div key={ind}>
          <a href={el}>{'Link ' + ind}</a>
        </div>
      ))}
    </div>
  );
};

const WelcomeName = ({ name }: { name: string }) => (
  <p>
    <span style={{ fontWeight: 'bold' }}>Welcome {name}</span>
  </p>
);
