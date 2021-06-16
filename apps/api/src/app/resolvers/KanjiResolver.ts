import DataLoader from 'dataloader';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Loader } from 'type-graphql-dataloader';
import { getRepository } from 'typeorm';
import { GetKanjisArgs } from '@sin-nihongo/graphql-interfaces';
import { Kanji } from '../entities/pg/Kanji';
import { Radical } from '../entities/pg/Radical';
import { KanjiConnection } from '../responses/Kanji';
import { ConnectionResolver } from './ConnectionResolver';
import { NodeResolver } from './NodeResolver';

@Resolver(() => KanjiConnection)
export class KanjiConnectionResolver extends ConnectionResolver(KanjiConnection, Kanji) {}

@Resolver(() => Kanji)
export class RadicalResolver extends NodeResolver(GetKanjisArgs, KanjiConnection, Kanji) {
  @FieldResolver(() => Radical, { description: '部首' })
  @Loader<number, Radical>(async (ids) =>
    getRepository(Radical, 'pg')
      .createQueryBuilder()
      .whereInIds(ids)
      .orderBy(`idx(ARRAY[${ids.join(',')}], id)`)
      .getMany()
  )
  radical(@Root() kanji: Kanji) {
    return (dataloader: DataLoader<number, Radical>) => dataloader.load(kanji.radicalId);
  }
}
