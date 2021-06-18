// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractClassType<T = any> = abstract new (...args: any[]) => T;