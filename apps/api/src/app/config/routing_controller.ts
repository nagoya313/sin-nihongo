import 'reflect-metadata';
import { Express } from 'express';
import { useExpressServer } from 'routing-controllers';
import { GlyphsController } from '../controllers/GlyphsController';
import { GlyphwikiController } from '../controllers/GlyphwikiController';
import { KanjisController } from '../controllers/KanjisController';
import { RadicalsController } from '../controllers/RadicalsController';

export const initRoutingController = (app: Express) => {
  useExpressServer(app, {
    routePrefix: '/api/v1',
    defaultErrorHandler: true,
    controllers: [GlyphsController, GlyphwikiController, KanjisController, RadicalsController],
    authorizationChecker: async () => false,
  });
};
