import dotenv from 'dotenv';
dotenv.config();

export const SERVER_PORT = process.env['SERVER_PORT'] || 5000;
export const JWT_SECRET = process.env['JWT_SECRET'];
if (!JWT_SECRET) {
  console.log('No JWT secret string. Set JWT_SECRET environment variable.');
  process.exit(1);
}
