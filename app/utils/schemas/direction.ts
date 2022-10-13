import z from 'zod';

export const direction = z.enum(['asc', 'desc']).default('asc');
