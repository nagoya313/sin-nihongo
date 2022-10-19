import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { booleanRadio } from '~/utils/schemas/booleanRadio';
import { direction } from '~/utils/schemas/direction';
import { kana } from '~/utils/schemas/regex';

export const strokeCountKanjiQueryParams = withZod(
  z.object({
    direction,
    read: zfd.text(kana.max(10).optional()),
    regular: booleanRadio,
  }),
);
