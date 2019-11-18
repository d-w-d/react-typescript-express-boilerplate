import './config';

import express, { Request, Response, NextFunction } from 'express';
import { default as cookieParser } from 'cookie-parser';
import { default as createError } from 'http-errors';
import { default as logger } from 'morgan';
import { default as cors } from 'cors';
import compression from 'compression';

import { printReqDetails } from './middleware/print-req-details';
import { router } from './routes';

///////////////////////
// General set up
///////////////////////

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));
app.use((req, res, next) => {
  // Print out all requests (for debugging)
  printReqDetails(req, res);
  next();
});
app.use('/api/', router); // Mount main routes to /api/
app.use('*', (req, res, next) => {
  // Notify no-route matched notifier
  console.log('\n\n\n No route matched!!! \n\n\n');
  next();
});

///////////////////////
// Handle errors
///////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json({ message: err.message });
});
