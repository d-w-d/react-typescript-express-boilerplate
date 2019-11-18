import { DEFAULT_AUTH, IAuth } from './AuthContext';

export const getStoredUserAuth = (): IAuth => {
  const auth = window.localStorage.getItem('UserAuth');
  if (auth) {
    // console.log('auth', auth);
    const parsedAuth: IAuth = JSON.parse(auth);

    // Confirm parsed string is an object with IAuth properties:
    if (typeof parsedAuth.username === 'string' && typeof parsedAuth.token === 'string') {
      return parsedAuth;
    } else {
      console.error('Stored auth has incorrect format! Clearing local storage as precaution!');
      window.localStorage.clear();
    }
  }
  return DEFAULT_AUTH;
};
