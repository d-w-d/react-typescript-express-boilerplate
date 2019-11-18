import * as React from 'react';

import { IAuth, DEFAULT_AUTH } from '../Contexts/AuthContext';

/**
 * Think of this hook as 'react-state middleware'. By passing our local-storage state through this hook and
 * the useState mechanism, we make it so that changes to the auth state trigger rerenders in
 * components that imbibe the auth context. Without this, changes to localStorage would not trigger re-renders.
 * @param initialState
 */
export const useAuthHandler = (initialState: IAuth) => {
  const [authState, setAuthState] = React.useState(initialState);

  const setAuth = (userAuth: IAuth) => {
    window.localStorage.setItem('UserAuth', JSON.stringify(userAuth));
    setAuthState(userAuth);
  };

  const unsetAuth = () => {
    window.localStorage.clear();
    setAuthState(DEFAULT_AUTH);
  };

  return {
    auth: authState,
    setAuth,
    unsetAuth
  };
};
