import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const glyphQueryParams = withZod(
  z.object({
    q: zfd.text(z.string().optional()),
    offset: zfd.numeric(z.number().min(0).default(0)),
  }),
);

export const glyphParams = withZod(
  z.object({
    name: zfd.text(),
  }),
);
