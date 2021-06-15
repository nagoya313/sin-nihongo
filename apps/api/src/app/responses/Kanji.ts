import { ObjectType } from 'type-graphql';
import { Kanji } from '../entities/Kanji';
import { Connection } from './Connection';

@ObjectType()
export class KanjiConnection extends Connection(Kanji) {}
