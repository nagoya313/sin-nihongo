import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const jisLevelRadio = zfd.numeric(
  z
    .union([z.literal('none'), z.literal(1), z.literal(2)])
    .default('none')
    .transform((level) => (level === 'none' ? undefined : level)),
);
