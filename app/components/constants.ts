export const SEARCH_WAIT = 500;
export const ORDERS = Object.freeze([
  { key: 'stroke_count', label: '画数順' },
  { key: 'read', label: 'よみかた順' },
] as const);
export const REGULAR_RADIO = Object.freeze([
  { key: 'none', label: '指定なし' },
  { key: 'true', label: '常用' },
  { key: 'false', label: '常用外' },
] as const);
