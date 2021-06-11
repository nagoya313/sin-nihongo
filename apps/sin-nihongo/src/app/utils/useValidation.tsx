import { createContext, useContext, useEffect, useMemo } from 'react';
import { useAsyncFn } from 'react-use';
import { plainToClass, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';

export const ValidationErrorContext = createContext<ReturnType<typeof useValidateState>>({
  isValidating: false,
  isValid: true,
  errors: undefined,
});

type Props<T extends { [key in K]: T[K] }, K extends keyof T> = {
  schema: ClassConstructor<T>;
  state?: ValidationPayload<T, K>;
  children?: React.ReactNode;
};

export function ValidationProvider<T extends { [key in K]: T[K] }, K extends keyof T>({
  schema,
  state,
  children,
}: Props<T, K>) {
  const validations = useValidateState(schema, state);

  return <ValidationErrorContext.Provider value={validations}>{children}</ValidationErrorContext.Provider>;
}

export const useValidation = () => {
  return useContext(ValidationErrorContext);
};

type ValidationErrorMap<T, K extends keyof T> = { [key in K]?: string[] };
type ValidationPayload<T, K extends keyof T> = { [key in K]?: T[K] };

const useValidateState = <T extends { [key in K]: T[K] }, K extends keyof T>(
  schema: ClassConstructor<T>,
  state?: ValidationPayload<T, K>
) => {
  const [valid, fetch] = useAsyncFn(
    async (s: ValidationPayload<T, K>) => {
      const errors = await validate(plainToClass<T, ValidationPayload<T, K>>(schema, s));
      const errorMap: ValidationErrorMap<T, K> = errors.reduce(
        (acc, value) => ({
          ...acc,
          [value.property as K]: Object.values(value.constraints || {}),
        }),
        {} as ValidationErrorMap<T, K>
      );
      return { errors: errorMap, isValid: errors.length === 0 };
    },
    [state]
  );

  useEffect(() => {
    typeof state !== 'undefined' && fetch(state);
  }, [state, fetch]);

  const memo = useMemo(
    () => ({ isValidating: valid.loading, isValid: valid.value?.isValid ?? true, errors: valid.value?.errors }),
    [valid]
  );
  return memo;
};
