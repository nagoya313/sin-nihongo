import { validate } from 'class-validator';
import { NotImplementedError } from './NotImplementedError';

interface Target {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: number;
}

export const minProperty = async (subject: Target, property: string, min: number) => {
  subject[property] = min - 0.1;
  const notMinCheck = await validate(subject);
  subject[property] = min;
  const minCheck = await validate(subject);

  const pass =
    notMinCheck.some((error) => error.property === property && error.constraints?.min) &&
    !minCheck.some((error) => error.property === property && error.constraints?.min);

  if (pass) {
    return {
      message: () => {
        throw NotImplementedError;
      },
      pass: true,
    };
  } else {
    return {
      message: () => `${property} is greater than or equal to ${min}`,
      pass: false,
    };
  }
};
