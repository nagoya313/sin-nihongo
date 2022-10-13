import { type z, type ZodType } from 'zod';

type Schema<T extends z.infer<ZodType>> = T extends z.infer<infer S> ? S : never;

declare global {
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T extends ZodType> {
      toAcceptValue(value: unknown): R;
      toAcceptValues(values: ReadonlyArray<unknown>): R;
      toAcceptPropertyValue(property: string, value: unknown): R;
      toAcceptPropertyValues(property: string, values: ReadonlyArray<unknown>): R;
      toHaveInvalidMessage(value: unknown, message: string): R;
    }
  }
}
