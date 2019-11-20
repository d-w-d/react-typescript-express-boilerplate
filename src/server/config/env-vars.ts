import dotenv from 'dotenv';
dotenv.config();

export const SITE_LONG_TITLE = process.env['SITE_LONG_TITLE'] || '[SITE NEEDS TITLE]';
export const SITE_SHORT_TITLE = process.env['SITE_SHORT_TITLE'] || '[SITE NEEDS TITLET]';
export const SITE_DESCRIPTION = process.env['SITE_DESCRIPTION'] || '[SITE NEEDS DESCRIPTION]';
export const SERVER_PORT = process.env['SERVER_PORT'] || 5000;
export const JWT_SECRET = process.env['JWT_SECRET'];
if (!JWT_SECRET) {
  console.log('No JWT secret string. Set JWT_SECRET environment variable.');
  process.exit(1);
}
