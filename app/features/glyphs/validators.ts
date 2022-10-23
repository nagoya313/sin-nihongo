import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { kageData, kageName } from '~/utils/schemas/kageData';

export const glyphsQueryParams = withZod(
  z.object({
    q: zfd.text(z.string().optional()),
    offset: zfd.numeric(z.number().min(0).default(0)),
  }),
);

export const glyphParams = withZod(z.object({ name: zfd.text() }));
export const glyphPreviewParams = withZod(z.object({ data: zfd.text() }));

export const glyphCreateParams = withZod(
  z
    .object({
      name: kageName,
      data: kageData,
    })
    .and(
      z.union([
        z.object({ subaction: z.undefined() }),
        z.object({
          q: zfd.text(),
          subaction: zfd.text(z.literal('from-glyphwiki')),
        }),
      ]),
    ),
);

export const glyphUpdateParams = withZod(z.object({ data: kageData }));
export const glyphDestroyParams = withZod(z.object({ name: zfd.text(z.string().max(50)) }));
