import 'reflect-metadata';
import { Express } from 'express';
import * as passport from 'passport';
import { useExpressServer, Action } from 'routing-controllers';
import { GlyphsController } from '../controllers/GlyphsController';
import { GlyphwikiController } from '../controllers/GlyphwikiController';
import { KanjisController } from '../controllers/KanjisController';
import { RadicalsController } from '../controllers/RadicalsController';

export const initRoutingController = (app: Express) => {
  useExpressServer(app, {
    routePrefix: '/api/v1',
    defaultErrorHandler: true,
    controllers: [GlyphsController, GlyphwikiController, KanjisController, RadicalsController],
    validation: { whitelist: true, forbidNonWhitelisted: true },
    authorizationChecker: async (action: Action) =>
      new Promise<boolean>((resolve, reject) => {
        passport.authenticate('jwt', (err, user) => {
          if (err) {
            return reject(err);
          }
          if (!user) {
            return resolve(false);
          }
          return resolve(true);
        })(action.request, action.response, action.next);
      }),
  });
};
