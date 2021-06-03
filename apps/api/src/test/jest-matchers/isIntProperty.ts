import { validate } from 'class-validator';
import { NotImplementedError } from './NotImplementedError';

interface Target {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: number;
}

export const isIntProperty = async (subject: Target, property: string) => {
  subject[property] = 1.1;
  const notIntCheck = await validate(subject);
  subject[property] = 1;
  const intCheck = await validate(subject);

  const pass =
    notIntCheck.some((error) => error.property === property && error.constraints?.isInt) &&
    !intCheck.some((error) => error.property === property && error.constraints?.isInt);

  if (pass) {
    return {
      message: () => {
        throw NotImplementedError;
      },
      pass: true,
    };
  } else {
    return {
      message: () => `expect ${property} property is int`,
      pass: false,
    };
  }
};
