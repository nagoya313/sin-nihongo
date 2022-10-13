import isEqual from 'lodash/isEqual';
import { assert } from 'vitest';
import { ZodObject, ZodType } from 'zod';

export const toAcceptValue = (schema: ZodType, value: unknown) => {
  assert(schema instanceof ZodType, 'schema is not zod schema.');
  const pass = schema.safeParse(value).success;
  const stringifyValues = JSON.stringify(value);

  const message = pass
    ? () => `expected ${stringifyValues} is not valid value.`
    : () => `expected ${stringifyValues} is valid value.`;

  return { pass, message };
};

export const toAcceptValues = (schema: ZodType, values: ReadonlyArray<unknown>) => {
  assert(schema instanceof ZodType, 'schema is not zod schema.');
  const pass = values.every((value) => schema.safeParse(value).success);
  const stringifyValues = JSON.stringify(values);

  const message = pass
    ? () => `expected ${stringifyValues} is not valid values.`
    : () => `expected ${stringifyValues} is valid values.`;

  return { pass, message };
};

const isPass = (schema: ZodType, property: string, value: unknown) => {
  const parsed = schema.safeParse({ [property]: value });
  return parsed.success || parsed.error.errors.every(({ path }) => !isEqual(path, [property]));
};

export const toAcceptPropertyValue = (schema: ZodType, property: string, value: unknown) => {
  assert(schema instanceof ZodObject, 'schema is not zod object schema.');
  const pass = isPass(schema, property, value);
  const stringifyValues = JSON.stringify(value);

  const message = pass
    ? () => `expected ${stringifyValues} is not valid property "${property}" value.`
    : () => `expected ${stringifyValues} is valid property "${property}" value.`;

  return { pass, message };
};

export const toAcceptPropertyValues = (schema: ZodType, property: string, values: ReadonlyArray<unknown>) => {
  assert(schema instanceof ZodObject, 'schema is not zod object schema.');
  const pass = values.every((value) => isPass(schema, property, value));
  const stringifyValues = JSON.stringify(values);

  const message = pass
    ? () => `expected ${stringifyValues} is not valid property "${property}" value.`
    : () => `expected ${stringifyValues} is valid property "${property}" value.`;

  return { pass, message };
};

export const toHaveInvalidMessage = (schema: ZodType, value: unknown, errorMessage: string) => {
  assert(schema instanceof ZodType, 'schema is not zod schema.');
  const parsed = schema.safeParse(value);
  const pass =
    !parsed.success && parsed.error.errors.some(({ path, message }) => isEqual(path, []) && message === errorMessage);

  const message = pass
    ? () => `expected not have messsage ${errorMessage}.`
    : () => `expected have ivalid message ${errorMessage}.`;

  return { pass, message };
};
