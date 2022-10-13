import { type Generated } from 'kysely';
import { type ReadonlyDeep } from 'type-fest';

export type Timestamp = ReadonlyDeep<{
  created_at: Generated<Date>;
  updated_at: Generated<Date>;
}>;
