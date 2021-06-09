import 'reflect-metadata';
import { Express, Request } from 'express';
import { authenticate } from 'passport';
import { Action, ExpressMiddlewareInterface, Middleware, useExpressServer } from 'routing-controllers';
import { routePrefix } from '@sin-nihongo/api-interfaces';
import { GlyphsController } from '../controllers/GlyphsController';
import { GlyphwikiController } from '../controllers/GlyphwikiController';
import { KanjisController } from '../controllers/KanjisController';
import { RadicalsController } from '../controllers/RadicalsController';

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

export const initRoutingController = (app: Express) => {
  useExpressServer(app, {
    routePrefix: routePrefix,
    defaultErrorHandler: true,
    controllers: [GlyphsController, GlyphwikiController, KanjisController, RadicalsController],
    authorizationChecker: async (action: Action) =>
      new Promise<boolean>((resolve, reject) => {
        authenticate('jwt', (err, user) => {
          if (err) {
            return reject(err);
          }
          if (!user) {
            return resolve(false);
          }
          return resolve(true);
        })(action.request, action.response, action.next);
      }),
    middlewares: [LoggingMiddleware],
  });
};
