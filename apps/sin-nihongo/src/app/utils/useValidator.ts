import { useMemo } from 'react';
import { useAsyncFn } from 'react-use';
import { plainToClass, ClassConstructor } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ParamsPayload } from './useSearchForm';

const toErrorMessage = (error: ValidationError) => Object.values(error.constraints || {});

type ValidationErrorMap<T> = { [key in keyof T]?: string[] };

const makeErrorMap = <T>(errors: ValidationError[]) =>
  errors.reduce((acc, value): ValidationErrorMap<T> => {
    const tmp = { ...acc };
    tmp[value.property as keyof T] = toErrorMessage(value);
    return tmp;
  }, {} as ValidationErrorMap<T>);

type UseValidatorStateType<T> = { isValidating: boolean; isValid?: boolean; errors?: ValidationErrorMap<T> };
type UseValidatorAsyncFuncType<T> = (s: ParamsPayload<T>) => void;
type UseValidatorResultType<T> = [UseValidatorStateType<T>, UseValidatorAsyncFuncType<T>];

export const useValidator = <T extends ParamsPayload<T>>(schema: ClassConstructor<T>) => {
  const [valid, fetch] = useAsyncFn(
    async (s: ParamsPayload<T>) => {
      const errors = await validate(plainToClass<T, ParamsPayload<T>>(schema, s));
      const errorMap = makeErrorMap<T>(errors);
      return { errors: errorMap, isValid: errors.length === 0 };
    },
    [schema]
  );

  const result = useMemo((): UseValidatorResultType<T> => {
    return [{ isValidating: valid.loading, isValid: valid.value?.isValid, errors: valid.value?.errors }, fetch];
  }, [valid, fetch]);

  return result;
};
