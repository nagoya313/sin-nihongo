import React, { useCallback, useEffect, useReducer } from 'react';
import { ClassConstructor } from 'class-transformer';
import { useValidator } from './useValidator';

export type ParamsPayload<P> = { [key in keyof P]: P[key] };

type Store<P> = { params?: ParamsPayload<P> };
type Action<P> = { type: 'SET_VALUE'; name: keyof P; value: P[keyof P] };

const createReducer = <P>(): React.Reducer<Store<P>, Action<P>> => (store, action): Store<P> => {
  switch (action.type) {
    case 'SET_VALUE':
      return { params: { ...store.params, [action.name as keyof P]: action.value } as ParamsPayload<P> };
  }
};

export const useSearchForm = <P extends ParamsPayload<P>>(schema: ClassConstructor<P>) => {
  const [store, dispatch] = useReducer(createReducer<P>(), {} as Store<P>);
  const [{ isValid, errors }, validator] = useValidator(schema);

  const setValue = useCallback(
    (name: keyof P, value: P[keyof P]) => {
      dispatch({ type: 'SET_VALUE', name, value });
    },
    [dispatch]
  );

  useEffect(() => {
    store.params && validator(store.params);
  }, [store, validator]);

  return { params: store.params, validation: { isValid, errors }, setValue };
};
