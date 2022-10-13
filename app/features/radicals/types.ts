import { type ReadonlyDeep } from 'type-fest';
import { type Timestamp } from '~/db/timestamp';

export type Radical = ReadonlyDeep<{
  code_point: number;
  stroke_count: number;
}> &
  Timestamp;

export type RadicalRead = ReadonlyDeep<{
  read: string;
  radical_code_point: number;
}> &
  Timestamp;
