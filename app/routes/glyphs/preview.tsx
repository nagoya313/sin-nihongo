import { type LoaderArgs } from '@remix-run/node';
import { getPreview } from '~/features/glyphs/services.server';
import { authGuard } from '~/utils/request.server';

export const loader = async ({ request }: LoaderArgs) => {
  await authGuard(request);
  return getPreview(request);
};
