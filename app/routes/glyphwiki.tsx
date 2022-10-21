import { type LoaderArgs } from '@remix-run/node';
import { index } from '~/features/glyphwiki/serveces.server';
import { authGuard } from '~/utils/request.server';

export const loader = (args: LoaderArgs) => authGuard(args, index);
