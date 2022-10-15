import { type Timestamp } from '~/db/timestamp';

export type Radical = Readonly<{
  code_point: number;
  stroke_count: number;
}> &
  Timestamp;

export type RadicalRead = Readonly<{
  read: string;
  radical_code_point: number;
}> &
  Timestamp;
