import * as React from 'react';

import { useAuthHandler } from '../CustomHooks/authHandler';
import { getStoredUserAuth } from './localStorage';

export const DEFAULT_AUTH = { username: '', token: '' };

export type IAuth = {
  username: string;
  token: string;
};

export interface IAuthContextHook {
  auth: IAuth;
  setAuth: (userAuth: IAuth) => void;
  unsetAuth: () => void;
}

export const authContext = React.createContext<IAuthContextHook>({
  auth: DEFAULT_AUTH,
  setAuth: () => {},
  unsetAuth: () => {}
});

const { Provider } = authContext;

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, setAuth, unsetAuth } = useAuthHandler(getStoredUserAuth());
  return <Provider value={{ auth, setAuth, unsetAuth }}>{children}</Provider>;
};
