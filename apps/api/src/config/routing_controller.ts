import 'reflect-metadata';
import { Express } from 'express';
import { useExpressServer } from 'routing-controllers';
import { GlyphwikiController } from '../controllers/GlyphwikiController';

export const initRoutingController = (app: Express) => {
  useExpressServer(app, {
    routePrefix: '/api/v1',
    defaultErrorHandler: true,
    controllers: [GlyphwikiController],
  });
};
