import 'reflect-metadata';
import { Request } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'before' })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: unknown, next: () => unknown) {
    if (process.env.NODE_ENV === 'development') {
      console.log('URL: ', request.url);
      console.log('Query: ', request.query);
      console.log('Params: ', request.params);
    }
    next();
  }
}
