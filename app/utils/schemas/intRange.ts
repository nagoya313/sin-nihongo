import { z } from 'zod';

export const intRange = (min: number, max: number) => z.number().min(min).max(max).int('整数で入力してください');
