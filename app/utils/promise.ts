import { type UnionSelect } from './types';

export type SelectPromiseFulfilledResult<T> = UnionSelect<T, 'value'>;

export const filterPromiseFulfilledResults = <T>(result: ReadonlyArray<PromiseSettledResult<T>>) =>
  result.filter(({ status }) => status === 'fulfilled') as SelectPromiseFulfilledResult<typeof result[number]>[];
