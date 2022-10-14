import z from 'zod';

export const booleanRadio = z.enum(['none', 'true', 'false']).default('none');
