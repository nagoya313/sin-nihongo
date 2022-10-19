import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const glyphwikiQueryParams = withZod(
  z.object({
    q: zfd
      .text(z.string())
      .transform((q) => ([...q].length === 1 ? `u${q.codePointAt(0)!.toString(16).padStart(4, '0')}` : q)),
  }),
);
