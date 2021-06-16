import fs from 'fs';
import parse from 'csv-parse';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Kanji } from '../entities/pg/Kanji';

export default class CreateKanjis implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    const kanjis: Kanji[] = [];
    const rs = fs.createReadStream('db/seeds/kanjis.csv', { encoding: 'utf8' }).pipe(parse({ columns: true }));
    for await (const row of rs) {
      const kanji = new Kanji(
        parseInt(row.codePoint),
        row.regular == 'true',
        row.forName == 'true',
        parseInt(row.numberOfStrokes),
        parseInt(row.numberOfStrokesInRadical),
        parseInt(row.radicalId),
        parseInt(row.jisLevel),
        row.kunyomi.split(','),
        row.onyomi.split(',')
      );
      kanjis.push(kanji);
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into(Kanji)
      .values(kanjis)
      //.orUpdate({ conflict_target: ['code_point'], overwrite: ['kunyomi', 'onyomi'] })
      .orIgnore()
      .execute();
  }
}
