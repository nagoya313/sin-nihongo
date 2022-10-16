import { type LoaderArgs } from '@remix-run/node';
import { authenticator } from '~/session.server';

export const loader = ({ request }: LoaderArgs) =>
  authenticator.authenticate('auth0', request, { successRedirect: '/', failureRedirect: '/' });
