import { validate } from 'class-validator';
import { NotImplementedError } from './NotImplementedError';

interface Target {
  [key: string]: number;
}

export const isIntProperty = async (subject: { new (): Target }, property: string) => {
  const model = new subject();
  model[property] = 1.1;
  const notIntCheck = await validate(model);
  model[property] = 1;
  const intCheck = await validate(model);

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
