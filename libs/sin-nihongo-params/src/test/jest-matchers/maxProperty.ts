import { validate } from 'class-validator';
import { NotImplementedError } from './NotImplementedError';

interface Target {
  [key: string]: number;
}

export const maxProperty = async (subject: { new (): Target }, property: string, min: number) => {
  const model = new subject();
  model[property] = min + 0.1;
  const notMaxCheck = await validate(model);
  model[property] = min;
  const maxCheck = await validate(model);

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
