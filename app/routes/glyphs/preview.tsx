import { type LoaderArgs } from '@remix-run/node';
import { preview } from '~/features/glyphs/services.server';
import { authGuard } from '~/utils/request.server';

export const loader = (args: LoaderArgs) => authGuard(args, preview);
