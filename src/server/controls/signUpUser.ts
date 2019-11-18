import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/passport-config';
import { getUsers, addUser } from '../utils/user-db';
import { ISignInOrUpPayload } from '../../common/dtoModels';

export function signUpUser(
  username: string,
  password: string,
  scope: any
): {
  status: number;
  message: string;
  data?: ISignInOrUpPayload;
} {
  // Fail if user already exists
  const users = getUsers();
  const user = users.find(el => el.username === username);
  if (!!user) return { status: 401, message: 'User already exists' };

  // Fail if password too short
  if (password.length < 3) return { status: 401, message: 'Password is less than 8 chars' };

  // Create new user and save to DB
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  addUser({ username, password: hashedPassword });

  // Create JWT and send response to client
  try {
    const token = jwt.sign({ username, scope: JSON.stringify(scope) }, JWT_SECRET);
    return { status: 201, message: 'User successfully created', data: { username, token } };
  } catch (error) {
    return { status: 500, message: 'Error occurred while signing JWT' };
  }
}
