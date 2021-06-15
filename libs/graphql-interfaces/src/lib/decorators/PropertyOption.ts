import { ColumnOption } from './ColumnOption';
import { FieldOption } from './FieldOption';

export type PropertyOption<V> = {
  name: string;
  optional?: boolean;
  field?: FieldOption;
  column?: ColumnOption;
  validations?: V;
  description?: string;
};
