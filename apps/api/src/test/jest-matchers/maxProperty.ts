import { validate } from 'class-validator';
import { NotImplementedError } from './NotImplementedError';

interface Target {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: number;
}

export const maxProperty = async (subject: Target, property: string, min: number) => {
  subject[property] = min + 0.1;
  const notMaxCheck = await validate(subject);
  subject[property] = min;
  const maxCheck = await validate(subject);

  const pass =
    notMaxCheck.some((error) => error.property === property && error.constraints?.max) &&
    !maxCheck.some((error) => error.property === property && error.constraints?.max);

  if (pass) {
    return {
      message: () => {
        throw NotImplementedError;
      },
      pass: true,
    };
  } else {
    return {
      message: () => `${property} is less than or equal to ${min}`,
      pass: false,
    };
  }
};
