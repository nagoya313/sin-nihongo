import { useForm as useFormOrg, UseFormProps } from 'react-hook-form';

type Nullable<T> = {
  [P in keyof T]?: T[P] | null;
};

export const useForm = <FieldValues>(props?: UseFormProps<Nullable<FieldValues>>) => {
  return useFormOrg<Nullable<FieldValues>>(props);
};
