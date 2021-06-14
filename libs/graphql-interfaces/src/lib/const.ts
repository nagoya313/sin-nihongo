const KANA_MATCHER = /^(?!.*[ぢづゐゑを])[\u3040-\u3093ー]+$/;
export const KANJI_USC_QUERY_PARAMS_MATCHER = /^((u[\da-f]{4})|[\u4E00-\u9FFF])$/;
export const GLYPHWIKI_QUERY_PARAMS_MATCHER = /^([\da-z-_]+(@\d+)?|.)$/;
export const RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER = KANA_MATCHER;
export const KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER = KANA_MATCHER;
