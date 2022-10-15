export type UnionSelect<T, TKey extends string> = Extract<T, { [key in TKey]: unknown }>;
