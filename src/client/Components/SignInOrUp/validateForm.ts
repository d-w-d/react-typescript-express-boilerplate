export interface IUserDetails {
  username: string;
  password: string;
  password2: string;
}

type TSetError = (error: string | null) => void;

export const validateForm = (
  userDetails: IUserDetails,
  isSigningIn: boolean,
  setError: TSetError
): boolean => {
  const { username, password, password2 } = userDetails;

  // Check for undefined or empty input fields
  if (!username || !password || (!isSigningIn && !password2)) {
    setError('Missing username and/or password');
    return false;
  }

  // Check passwords match
  if (!isSigningIn && password !== password2) {
    setError('Passwords do not match!');
    return false;
  }

  return true;
};
