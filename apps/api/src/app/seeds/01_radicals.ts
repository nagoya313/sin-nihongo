import * as fs from 'fs';
import * as parse from 'csv-parse';
import * as stream from 'stream';
import * as util from 'util';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Radical } from '../entities/Radical';

interface CsvRadical {
  readonly id: number;
  readonly names: string;
  readonly numberOfStrokes: number;
}

export default class CreateRaicals implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const radicals: Radical[] = [];
    const rs = fs.createReadStream('db/seeds/radicals.csv', { encoding: 'utf8' });
    const parser = parse({ columns: true }).on('data', (row: CsvRadical) => {
      radicals.push(new Radical(row.id, row.numberOfStrokes, row.names.split(',')));
    });
    const pipeline = util.promisify(stream.pipeline);

    await pipeline(rs, parser);
    await connection
      .createQueryBuilder()
      .insert()
      .into(Radical)
      .values(radicals)
      //.orUpdate({ conflict_target: ['id'], overwrite: ['names'] })
      .orIgnore()
      .execute();
  }
}
