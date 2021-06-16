import { ObjectType } from 'type-graphql';
import { GetKanjisArgs } from '@sin-nihongo/graphql-interfaces';
import { Kanji } from '../entities/pg/Kanji';
import { Connection } from './Connection';

@ObjectType()
export class KanjiConnection extends Connection(Kanji) {
  readonly args!: GetKanjisArgs;
}
