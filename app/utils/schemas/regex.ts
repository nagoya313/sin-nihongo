import { z } from 'zod';

const HIRAGANA_MATCHER = /^(?!.*[ぢづゐゑを])[\u3040-\u3093ー]+$/;

export const hiragana = z.string().regex(HIRAGANA_MATCHER, 'ひらがなで入力してください。');
