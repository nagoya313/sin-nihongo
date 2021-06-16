import fs from 'fs';
import parse from 'csv-parse';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Radical } from '../entities/pg/Radical';

export default class CreateRaicals implements Seeder {
  public async run(_factory: Factory, connection: Connection): Promise<void> {
    const radicals: Radical[] = [];
    const rs = fs.createReadStream('db/seeds/radicals.csv', { encoding: 'utf8' }).pipe(parse({ columns: true }));
    for await (const row of rs) {
      radicals.push(new Radical(parseInt(row.id) + 0x2eff, parseInt(row.numberOfStrokes), row.names.split(',')));
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into(Radical)
      .values(radicals)
      //.orUpdate({ conflict_target: ['codePoint'], overwrite: ['names'] })
      .orIgnore()
      .execute();
  }
}
