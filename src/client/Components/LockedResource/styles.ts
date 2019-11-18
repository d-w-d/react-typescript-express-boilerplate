import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      margin: 20,
      fontSize: 20,
      color: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }
  })
);
