import { Field, ObjectType } from 'type-graphql';
import { Kanji as KanjiEntity } from '../entities/Kanji';
import { TimeStampEntity } from '../entities/TimeStampEntity';

@ObjectType({ implements: [KanjiEntity, TimeStampEntity], description: '漢字' })
export class Kanji extends KanjiEntity {
  @Field(() => String, { description: '漢字' })
  get character() {
    return String.fromCodePoint(this.ucs);
  }
}
