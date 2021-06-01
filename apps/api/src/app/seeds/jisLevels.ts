import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { JisLevel } from '../entities/JisLevel';

export default class CreatJisLevels implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(JisLevel)
      .values([{ id: 1 }, { id: 2 }])
      .onConflict(`("id") DO NOTHING`)
      .execute();
  }
}
