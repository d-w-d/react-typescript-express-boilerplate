import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { apiJsonResponse } from '../utils/apiJsonResponse';

/**
 *
 * Middleware for routes that require a valid JWT token
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function authorizeJWT(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', function callback(err, user, info) {
    // Handle errors
    const message: string = (info.name && info.name) + ': ' + (info.message && info.message);
    if (err) return apiJsonResponse(res, 401, { message: err.message });
    if (!user) return apiJsonResponse(res, 401, { message });

    // Move onto now-authorized controller
    return next();
  })(req, res, next);
}
