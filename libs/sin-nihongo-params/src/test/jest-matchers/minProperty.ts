import { validate } from 'class-validator';
import { NotImplementedError } from './NotImplementedError';

interface Target {
  [key: string]: number;
}

export const minProperty = async (subject: { new (): Target }, property: string, min: number) => {
  const model = new subject();
  model[property] = min - 0.1;
  const notMinCheck = await validate(model);
  model[property] = min;
  const minCheck = await validate(model);

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
