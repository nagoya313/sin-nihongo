import { ColumnOptions } from 'typeorm';
import { WithLengthColumnType } from 'typeorm/driver/types/ColumnTypes';

// TODO.typeとoptionsの組合せが型安全ではない
export type ColumnOption = {
  unique?: boolean;
  type?: WithLengthColumnType;
  options?: ColumnOptions;
};
