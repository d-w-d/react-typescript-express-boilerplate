import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { TextField, Button, Paper, Typography } from '@material-ui/core';

import { useErrorHandler } from '@client/CustomHooks/errorHandler';
import { authContext } from '@client/Contexts/AuthContext';
import { lockedResourceApi } from './lockedResourceApi';
import { useStyles } from './styles';

export const LockedResource = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [apiData, setApiData] = React.useState<number[]>([]);
  const authState = React.useContext(authContext);

  // Load data on component mount
  useEffect(() => {
    (async function() {
      setIsLoading(true);
      const result = await lockedResourceApi(authState.auth.token);
      if (!!result.error) {
        setErrorMessage(result.message);
      } else {
        setApiData(result.data!.resource);
      }
      setIsLoading(false);
    })();
  }, []);

  if (!authState.auth.username) return <Redirect to="/" />;

  return (
    <div className={''}>
      {isLoading && <div>LOADING!!!</div>}
      {!!errorMessage ? (
        <Paper>
          <Typography className={classes.error}>{errorMessage}</Typography>
        </Paper>
      ) : (
        apiData.map((el, ind) => <div key={ind}>{el}</div>)
      )}
    </div>
  );
};
