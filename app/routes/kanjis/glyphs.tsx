import { type LoaderArgs } from '@remix-run/node';
import { glyphs } from '~/features/kanjis/services.server';
import { authGuard } from '~/utils/request.server';

export const loader = (args: LoaderArgs) => authGuard(args, glyphs);
