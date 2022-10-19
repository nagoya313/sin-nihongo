import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { booleanRadio } from '~/utils/schemas/booleanRadio';
import { direction } from '~/utils/schemas/direction';
import { intRange } from '~/utils/schemas/intRange';
import { kana } from '~/utils/schemas/regex';
import { MAX_STOROKE_COUNT, MIN_STOROKE_COUNT } from '../kanjis/constants';

export const readKanjiQueryParams = withZod(
  z.object({
    direction,
    strokeCount: zfd.numeric(intRange(MIN_STOROKE_COUNT, MAX_STOROKE_COUNT).optional()),
    read: zfd.text(kana.max(10).optional()),
    regular: booleanRadio,
  }),
);

export { MAX_STOROKE_COUNT, MIN_STOROKE_COUNT };
