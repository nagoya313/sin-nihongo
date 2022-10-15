import { type Timestamp } from '~/db/timestamp';

export type Glyph = Readonly<{
  name: string;
  data: string;
}> &
  Timestamp;
