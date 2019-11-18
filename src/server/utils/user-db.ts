export interface IUser {
  username: string;
  password: string;
}

// Mock db with in-memory js array
const users: IUser[] = [
  {
    username: process.env['TEST_USERNAME'] || '',
    password: process.env['TEST_PASSWORD'] || ''
  }
];

export function getUsers() {
  return users;
}

export function addUser(user: IUser) {
  users.push(user);
}
