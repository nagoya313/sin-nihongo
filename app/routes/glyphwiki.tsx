import { type LoaderArgs } from '@remix-run/node';
import { get } from '~/features/glyphwiki/serveces.server';
import { authGuard } from '~/utils/request.server';

export const loader = async ({ request }: LoaderArgs) => {
  await authGuard(request);
  return get(request);
};
