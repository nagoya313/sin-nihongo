import { parse } from 'csv-parse';
import fs from 'fs';
import { type InsertObject, type Kysely } from 'kysely';
import { type Database } from '../types';

type KanjiCSV = {
  code_point: number;
  radical_id: number;
  in_radical_stroke_count: number;
  stroke_count: number;
  on_yomi: string;
  kun_yomi: string;
  jis_level: 1 | 2;
  regular: boolean;
  for_name: boolean;
};

const csvRead = async () => {
  const rs = fs.createReadStream('./seeds/kanjis.csv', { encoding: 'utf8' }).pipe(parse({ columns: true, cast: true }));
  const kanjis: Array<InsertObject<Database, 'kanji'>> = [];
  const kanjiReads: Array<InsertObject<Database, 'kanji_read'>> = [];

  for await (const {
    code_point,
    radical_id,
    in_radical_stroke_count,
    stroke_count,
    on_yomi,
    kun_yomi,
    jis_level,
    regular,
    for_name,
  } of rs as AsyncIterable<KanjiCSV>) {
    kanjis.push({
      code_point,
      stroke_count,
      in_radical_stroke_count,
      radical_code_point: radical_id + 0x2eff,
      jis_level,
      regular,
      for_name,
    });
    on_yomi.split(',').forEach((read) => {
      if (read.trim()) {
        kanjiReads.push({ read, kanji_code_point: code_point });
      }
    });
    kun_yomi.split(',').forEach((read) => {
      if (read.trim()) {
        kanjiReads.push({ read, kanji_code_point: code_point });
      }
    });
  }

  return { kanjis, kanjiReads };
};

export const kanjiSeed = async (db: Kysely<Database>) => {
  const { kanjis, kanjiReads } = await csvRead();

  await db
    .insertInto('kanji')
    .values(kanjis)
    .onConflict((oc) =>
      oc.column('code_point').doUpdateSet({
        stroke_count: (eb) => eb.ref('excluded.stroke_count'),
        in_radical_stroke_count: (eb) => eb.ref('excluded.in_radical_stroke_count'),
        radical_code_point: (eb) => eb.ref('excluded.radical_code_point'),
        jis_level: (eb) => eb.ref('excluded.jis_level'),
        regular: (eb) => eb.ref('excluded.regular'),
        for_name: (eb) => eb.ref('excluded.for_name'),
      })
    )
    .execute();

  await db
    .insertInto('kanji_read')
    .values(kanjiReads)
    .onConflict((oc) => oc.columns(['kanji_code_point', 'read']).doNothing())
    .execute();
};
