import { withZod } from '@remix-validated-form/with-zod';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { booleanRadio } from '~/utils/schemas/booleanRadio';
import { direction } from '~/utils/schemas/direction';
import { intRange } from '~/utils/schemas/intRange';
import { kana } from '~/utils/schemas/regex';

export const MIN_STOREKE_COUNT = 1;
export const MAX_STOREKE_COUNT = 30;
export const MIN_IN_RADICAL_STOREKE_COUNT = -1;
export const MAX_IN_RADICAL_STOREKE_COUNT = 25;

export const kanjiQueryParams = withZod(
  z.object({
    direction,
    orderBy: z.enum(['stroke_count', 'read']).default('stroke_count'),
    strokeCount: zfd.numeric(intRange(MIN_STOREKE_COUNT, MAX_STOREKE_COUNT).optional()),
    read: zfd.text(kana.max(10, '10文字以内で入力してください').optional()),
    regular: booleanRadio,
    offset: zfd.numeric(z.number().min(0).default(0)),
  }),
);

export const radicalKanjiQueryParams = withZod(
  z.object({
    direction,
    orderBy: z.enum(['stroke_count', 'read']).default('stroke_count'),
    strokeCount: zfd.numeric(intRange(MIN_IN_RADICAL_STOREKE_COUNT, MAX_IN_RADICAL_STOREKE_COUNT).optional()),
    read: zfd.text(kana.max(10, '10文字以内で入力してください').optional()),
    regular: booleanRadio,
  }),
);

export const kanjiParams = withZod(
  z.object({
    codePoint: zfd.numeric(z.number().int()),
  }),
);