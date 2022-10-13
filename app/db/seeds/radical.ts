import { parse } from 'csv-parse';
import fs from 'fs';
import { type InsertObject, type Kysely } from 'kysely';
import { type Database } from '../types';

type RadicalCSV = {
  id: number;
  names: string;
  stroke_count: number;
};

const csvRead = async () => {
  const rs = fs
    .createReadStream('./seeds/radicals.csv', { encoding: 'utf8' })
    .pipe(parse({ columns: true, cast: true }));
  const radicals: Array<InsertObject<Database, 'radical'>> = [];
  const radicalReads: Array<InsertObject<Database, 'radical_read'>> = [];

  for await (const { id, names, stroke_count } of rs as AsyncIterable<RadicalCSV>) {
    const code_point = id + 0x2eff;
    radicals.push({ code_point, stroke_count });
    names.split(',').forEach((read) => {
      radicalReads.push({ read, radical_code_point: code_point });
    });
  }

  return { radicals, radicalReads };
};

export const radicalSeed = async (db: Kysely<Database>) => {
  const { radicals, radicalReads } = await csvRead();

  await db
    .insertInto('radical')
    .values(radicals)
    .onConflict((oc) => oc.column('code_point').doUpdateSet({ stroke_count: (eb) => eb.ref('excluded.stroke_count') }))
    .execute();

  await db
    .insertInto('radical_read')
    .values(radicalReads)
    .onConflict((oc) => oc.columns(['radical_code_point', 'read']).doNothing())
    .execute();
};
