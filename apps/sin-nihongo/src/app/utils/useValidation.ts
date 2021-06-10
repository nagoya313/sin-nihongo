import { useAsync } from 'react-use';
import { plainToClass, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';

type ValidationErrorMap<T, K extends keyof T> = { [key in K]?: string[] };
type ValidationPayload<T, K extends keyof T> = { [key in K]?: T[K] };

// eslint-disable-next-line @typescript-eslint/ban-types
export const useValidation = <T extends object, K extends keyof T>(
  schema: ClassConstructor<T>,
  state: ValidationPayload<T, K>
) => {
  const valid = useAsync(async () => {
    const errors = await validate(plainToClass<T, ValidationPayload<T, K>>(schema, state));
    const errorMap: ValidationErrorMap<T, K> = errors.reduce(
      (acc, value) => ({
        ...acc,
        [value.property as K]: Object.values(value.constraints || {}),
      }),
      {} as ValidationErrorMap<T, K>
    );
    return { errors: errorMap, isValid: errors.length === 0 };
  }, [state]);
  return { isValidating: valid.loading, isValid: valid.value?.isValid, errors: valid.value?.errors };
};
