import bcrypt from 'bcrypt';
import passport from 'passport';
import passportJwt from 'passport-jwt';
import passportLocal from 'passport-local';

import { getUsers } from '../utils/user-db';
export const JWT_SECRET = process.env['JWT_SECRET'] || 'defaultSecret';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

/**
 * Here we configure passport via its `.use()` method so that we can then call:
 *
    passport.authenticate('local', function callback(err, user, info) {
      ...
    })(req, res, next);
 *
 *  ... in an express middleware function in our sign-in route and have the callback function executed.
 * Since `passport.authenticate` MUST be called as an express middleware function, it will
 * be executed in a context with (req, res, next) params passed to it. From the req.body
 * object passport will look for properties `username` and `password`. If `req.body` names these
 * params differently, then we need to map them with the `usernameField` and/or `passwordField`
 * properties in object passed as the first argument.
 */
passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    (username: string, password: string, done: any) => {
      const users = getUsers();
      // Search for existing user
      const user = users.find(el => el.username === username);

      if (!user) return done(undefined, false, { message: `username ${username} not found.` });
      //
      // Test submitted password
      bcrypt.compare(password, user.password, (err: Error, isMatch: boolean) => {
        if (err) return done(err);
        if (!isMatch) return done(undefined, false, { message: 'Invalid username or password.' });
        return done(undefined, user);
      });
    }
  )
);

/**
 * Here we configure passport via its `.use()` method so that we can then call:
 *
    passport.authenticate('jwt', function callback(err, user, info) {
      ...
    })(req, res, next);
 *
 *  ... in an express middleware in a resource route and have the callback function executed.
 * Since `passport.authenticate` MUST be called as an express middleware function, it will
 * be executed in a context with (req, res, next) params passed to it. From the req.body
 * object it will look for properties `username` and `password`. If `req.body` names these
 * params differently, then we need to map them with the `usernameField` and/or `passwordField`
 * properties.
 */
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET
    },
    function(jwtToken, done) {
      const isUserVerifiedToExist = false;

      if (!isUserVerifiedToExist) {
        done(undefined, { username: jwtToken.username }, jwtToken);
      } else {
        const users = getUsers();
        // console.log('jwtToken --> ', jwtToken, users);
        // Extract username from token
        const user = users.find(el => el.username === jwtToken.username);
        // If such a user exists, pass it onto controller
        if (!!user) return done(undefined, user, jwtToken);
        // Else return false so controller can close with error
        return done(undefined, false);
      }
    }
  )
);
