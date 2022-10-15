import { z } from 'zod';
import { zfd } from 'zod-form-data';

const PG_SMALL_INT_MAX = 32767;

export const codePoint = zfd.numeric(z.number().int().positive().max(PG_SMALL_INT_MAX));
