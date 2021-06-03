import { validate } from 'class-validator';
import { NotImplementedError } from './NotImplementedError';

interface Target {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allowValueProperty = async (subject: Target, property: string, value: any) => {
  subject[property] = value;
  const matchCheck = await validate(subject);

  const pass = !matchCheck.some((error) => error.property === property && error.constraints?.matches);

  if (pass) {
    return {
      message: () => `${property} is not allow value ${value}`,
      pass: true,
    };
  } else {
    return {
      message: () => `${property} is allow value ${value}`,
      pass: false,
    };
  }
};
