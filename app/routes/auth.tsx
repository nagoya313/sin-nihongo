import { type ActionArgs } from '@remix-run/node';
import { authenticator } from '~/session.server';

export const action = ({ request }: ActionArgs) => authenticator.authenticate('auth0', request);
