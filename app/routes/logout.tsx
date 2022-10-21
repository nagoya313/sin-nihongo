import { type ActionArgs } from '@remix-run/node';
import { logout } from '~/features/users/service.server';

export const action = (args: ActionArgs) => logout(args);
