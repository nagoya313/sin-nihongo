import { z } from 'zod';

export const intRange = (min: number, max: number) =>
  z
    .number()
    .min(min, `${min}以上で入力してください`)
    .max(max, `${max}以下で入力してください`)
    .int('整数で入力してください');
