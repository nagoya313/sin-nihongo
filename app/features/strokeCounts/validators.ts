import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { booleanRadio } from '~/utils/schemas/booleanRadio';
import { direction } from '~/utils/schemas/direction';
import { jisLevelRadio } from '~/utils/schemas/jisLevelRadio';
import { kana } from '~/utils/schemas/regex';
import { PG_SMALL_INT_MAX } from '~/utils/sql';

export const strokeCountKanjiQueryParams = withZod(
  z.object({
    direction,
    read: zfd.text(kana.max(10).optional()),
    regular: booleanRadio,
    forName: booleanRadio,
    jisLevel: jisLevelRadio,
    radical: zfd.numeric(z.number().min(0).max(PG_SMALL_INT_MAX).optional()),
  }),
);
