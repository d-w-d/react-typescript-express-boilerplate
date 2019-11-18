import passport from 'passport';
import { swaggerDefJson } from './config/swagger-def';
import { default as swaggerUi } from 'swagger-ui-express';
import express, { Request, Response } from 'express';
export const router = express.Router();

import { apiJsonResponse } from './utils/apiJsonResponse';
import { authorizeJWT } from './middleware/authorize-jwt';
import { IDemoPayload, ISignInOrUpPayload, ILockedResourcePayload } from '../common/dtoModels';

import { getLockedResource } from './controls/getLockedResource';
import { getDemoResource } from './controls/getDemoResource';
import { signUpUser } from './controls/signUpUser';
import { signInUser } from './controls/signInUser';
import { querySolr } from './controls/querySolr';

//
// Setup swagger routes
//

// Serve json straight up
router.get('/docs.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDefJson);
});

// Serve json via swagger UI
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefJson));

/**
 * @swagger
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       in: header
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *
 */

/**
 * @swagger
 *
 * /:
 *   get:
 *     description: Demo unprotected route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Simple demo json response
 */
router.get('/', (req: Request, res: Response) => {
  const data = getDemoResource();
  return apiJsonResponse<IDemoPayload>(res, 200, {
    message: 'Success fetching api data',
    data
  });
});

/**
 * @swagger
 *
 * /signup:
 *   post:
 *     summary: Creates a user
 *     parameters:
 *       - name: print-req
 *         in: query
 *         description: flag to print out req
 *         required: false
 *         schema:
 *           type: boolean
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: registration response with JWT
 */
router.post('/signup', (req, res) => {
  const { username, password, scope } = req.body;
  const { message, status, data } = signUpUser(username, password, scope);

  if (!!data) return apiJsonResponse<ISignInOrUpPayload>(res, status, { message, data });
  else return apiJsonResponse(res, status, { message });
});

/**
 * @swagger
 *
 * /signin:
 *   post:
 *     summary: Enables user to login with username and password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: print-req
 *         in: query
 *         description: flag to print out req
 *         required: false
 *         schema:
 *           type: boolean
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: login response with JWT
 */
router.post('/signin', (req, res, next) => {
  /**
   * Note: The `user` object in the passport.authenticate method is derived
   * here from the `local` strategy configured in `passport-config.ts` which
   * extracts the username and password directly from the req object passed to
   * it upon its invocation here
   */
  passport.authenticate('local', function(err, user, info) {
    //
    if (!!err) {
      return apiJsonResponse(res, 500, {
        message: 'Something went wrong authenticating the user. Message: ' + JSON.stringify(info)
      });
    }
    if (!user) {
      return apiJsonResponse(res, 401, {
        message: 'No such user exists'
      });
    }

    const data = signInUser(user);
    return apiJsonResponse<ISignInOrUpPayload>(res, 200, {
      data,
      message: 'Sign in successful'
    });
  })(req, res, next); // Pass req to passport.authenticate so it can extract a user object
});

/**
 * @swagger
 *
 * /solr-test:
 *   get:
 *     description: Basic unprotected route
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Simple demo json response
 */
router.get('/solr-test', async (req, res) => {
  const data = await querySolr();
  return apiJsonResponse<any>(res, 200, { message: 'Solr successfully queried', data });
});

/**
 * @swagger
 *
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       in: header
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: Access token is missing or invalid
 *
 * /locked:
 *   get:
 *     summary: Get a locked resource
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: print-req
 *         in: query
 *         description: flag to print out req
 *         required: false
 *         schema:
 *           type: boolean
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: registration response with JWT
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/locked', authorizeJWT, (req, res) => {
  const data = getLockedResource();
  return apiJsonResponse<ILockedResourcePayload>(res, 200, {
    message: 'Successful fetch of locked resource',
    data
  });
});
