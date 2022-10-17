import { useLoaderData } from '@remix-run/react';

export type UnionSelect<T, TKey extends string> = Extract<T, { [key in TKey]: unknown }>;
export type LoaderData<TLoader> = ReturnType<typeof useLoaderData<TLoader>>;
