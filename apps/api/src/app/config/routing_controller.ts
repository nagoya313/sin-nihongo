import { Express } from 'express';
import { authenticate } from 'passport';
import { Action, useExpressServer } from 'routing-controllers';
import { routePrefix } from '@sin-nihongo/api-interfaces';
import { GlyphsController } from '../controllers/GlyphsController';
import { GlyphwikiController } from '../controllers/GlyphwikiController';
import { KanjisController } from '../controllers/KanjisController';
import { RadicalsController } from '../controllers/RadicalsController';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

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
