import { z } from 'zod';

const HIRAGANA_MATCHER = /^(?!.*[ぢづゐゑを])[\u3040-\u3093ー]+$/;
const KANA_MATCHER = /^(?!.*[ぢづゐゑをヂヅヰヱヲ])[\u3040-\u3093\u30a0-\u30ffー]+$/;

export const hiragana = z.string().regex(HIRAGANA_MATCHER, 'ひらがなで入力してください。');
export const kana = z.string().regex(KANA_MATCHER, 'ひらがなかカタカナで入力してください。');
