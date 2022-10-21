import { z } from 'zod';

export const HIRAGANA_MATCHER = /^(?!.*[ぢづゐゑを])[\u3040-\u3093ー]+$/;
export const KATAKANA_MATCHER = /^(?!.*[ヂヅヰヱヲ])[\u30a0-\u30ffー]+$/;
export const KANA_MATCHER = /^(?!.*[ぢづゐゑをヂヅヰヱヲ])[\u3040-\u3093\u30a0-\u30ffー]+$/;
export const ONE_SIDE_KANA_MATCHER = /^(?!.*[ぢづゐゑを])[\u3040-\u3093ー]+$|^(?!.*[ヂヅヰヱヲ])[\u30a0-\u30ffー]+$/;

export const hiragana = z.string().regex(HIRAGANA_MATCHER, 'ひらがなで入力してください');
export const kana = z.string().regex(KANA_MATCHER, 'ひらがなかカタカナで入力してください');
export const oneSideKana = z.string().regex(ONE_SIDE_KANA_MATCHER, 'ひらがなかカタカナのみで入力してください');
