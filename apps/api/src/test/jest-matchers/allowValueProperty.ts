import { validate } from 'class-validator';

interface Target {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allowValueProperty = async (subject: { new (): Target }, property: string, value: any) => {
  const model = new subject();
  model[property] = value;
  const matchCheck = await validate(model);

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
