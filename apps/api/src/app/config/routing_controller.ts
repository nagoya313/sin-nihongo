import { Express } from 'express';
import { authenticate } from 'passport';
import { Action, useExpressServer } from 'routing-controllers';
import { routePrefix } from '@sin-nihongo/api-interfaces';

export const initRoutingController = (app: Express) => {
  useExpressServer(app, {
    routePrefix: routePrefix,
    defaultErrorHandler: true,
    controllers: [],
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
  });
};
