import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/passport-config';
import { ISignInOrUpPayload } from '../../common/dtoModels';

export function signInUser(user: any): ISignInOrUpPayload {
  const { username } = user;
  const token = jwt.sign({ username }, JWT_SECRET);
  return {
    username,
    token
  };
}
