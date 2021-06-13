import React, { useCallback, useEffect, useReducer } from 'react';
import { ClassConstructor } from 'class-transformer';
import { useValidator, ValidationErrorMap } from './useValidator';

export type ParamsPayload<P> = { [key in keyof P]: P[key] };

type Store<P> = { formValues?: ParamsPayload<P>; validatedValues?: ParamsPayload<P> };
type Action<P> =
  | { type: 'SET_VALUE'; name: keyof P; value: P[keyof P] }
  | { type: 'SET_VALIDATED_RESULT'; params: ParamsPayload<P> };

const createReducer = <P>(): React.Reducer<Store<P>, Action<P>> => (store, action): Store<P> => {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...store,
        formValues: { ...store.formValues, [action.name as keyof P]: action.value } as ParamsPayload<P>,
      };
    case 'SET_VALIDATED_RESULT':
      return { ...store, validatedValues: action.params };
  }
};

export type SearchFormControl<P> = {
  setValue: (name: keyof P, value: P[keyof P]) => void;
  isValid?: boolean;
  errors?: ValidationErrorMap<P>;
};

export const useSearchForm = <P extends ParamsPayload<P>>(schema: ClassConstructor<P>) => {
  const [store, dispatch] = useReducer(createReducer<P>(), {} as Store<P>);
  const [{ isValid, errors }, validator] = useValidator(schema);

  const setValue = useCallback((name: keyof P, value: P[keyof P]) => dispatch({ type: 'SET_VALUE', name, value }), [
    dispatch,
  ]);

  useEffect(() => {
    store.formValues && validator(store.formValues);
  }, [store.formValues, validator]);

  const control: SearchFormControl<P> = { isValid, errors, setValue };

  return { params: store.formValues, control };
};
