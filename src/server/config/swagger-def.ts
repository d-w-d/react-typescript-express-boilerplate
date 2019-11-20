import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { SITE_LONG_TITLE, SITE_DESCRIPTION } from './env-vars';

const API_BASE_PATH = '/api/xxx/yyy/';

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: SITE_LONG_TITLE,
      version: '1.0.0',
      description: SITE_DESCRIPTION
    },
    servers: [
      {
        url: '/api/',
        description: 'The extension for our api'
      }
    ]
  },
  // Path to files containing routes with swagger-jsdoc yml annotations
  apis: ['./src/server/routes.ts']
};

export const swaggerDefJson = swaggerJSDoc(swaggerOptions);
