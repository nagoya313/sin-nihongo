import { validate } from 'class-validator';
import { NotImplementedError } from './NotImplementedError';

// eslint-disable-next-line @typescript-eslint/ban-types
export const isOptionalProperty = async <T extends object>(subject: { new (): T }, property: string) => {
  const model = new subject();
  const errors = await validate(model);

  const pass = !errors.some((error) => error.property === property);

  if (pass) {
    return {
      message: () => NotImplementedError,
      pass: true,
    };
  } else {
    return {
      message: () => `expect ${property} property is optional`,
      pass: false,
    };
  }
};
