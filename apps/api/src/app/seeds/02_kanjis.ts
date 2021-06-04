import * as fs from 'fs';
import * as parse from 'csv-parse';
import * as stream from 'stream';
import * as util from 'util';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Kanji } from '../entities/Kanji';
import { toKanjiYomigana } from '../libs/kana';

interface CsvKanji {
  readonly ucs: number;
  readonly radicalId: number;
  readonly numberOfStrokesInRadical: number;
  readonly numberOfStrokes: number;
  readonly onyomi: string;
  readonly kunyomi: string;
  readonly jisLevel: number;
  readonly regular: string;
  readonly forName: string;
}

export default class CreateKanjis implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async run(_factory: Factory, connection: Connection): Promise<any> {
    const kanjis: Kanji[] = [];
    const rs = fs.createReadStream('db/seeds/kanjis.csv', { encoding: 'utf8' });
    const parser = parse({ columns: true }).on('data', (row: CsvKanji) => {
      const kanji = new Kanji();
      kanji.ucs = row.ucs;
      kanji.radicalId = row.radicalId;
      kanji.numberOfStrokesInRadical = row.numberOfStrokesInRadical;
      kanji.numberOfStrokes = row.numberOfStrokes;
      kanji.onyomi = row.onyomi.split(',').map((read) => toKanjiYomigana(read));
      kanji.kunyomi = row.kunyomi.split(',').map((read) => toKanjiYomigana(read));
      kanji.jisLevel = row.jisLevel;
      kanji.regular = row.regular == 'true';
      kanji.forName = row.forName == 'true';
      kanjis.push(kanji);
    });
    const pipeline = util.promisify(stream.pipeline);

    await pipeline(rs, parser);

    await connection
      .createQueryBuilder()
      .insert()
      .into(Kanji)
      .values(kanjis)
      .orUpdate({ conflict_target: ['ucs'], overwrite: ['onyomi', 'kunyomi'] })
      //.orIgnore()
      .execute();
  }
}
