import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const API_BASE_PATH = '/';

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'SBN Portal API',
      version: '1.0.0',
      description: 'SBN Portal API'
    },
    basePath: API_BASE_PATH
  },
  // Path to files containing routes with swagger-jsdoc yml annotations
  apis: ['./src/server/routes/*.ts']
};

export const swaggerDefJson = swaggerJSDoc(swaggerOptions);
