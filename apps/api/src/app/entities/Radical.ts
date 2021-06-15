import { Field, ObjectType } from 'type-graphql';
import { Entity, OneToMany, RelationId } from 'typeorm';
import { IntFieldColumn, PrimaryFieldColumn, StringArrayFieldColumn } from '@sin-nihongo/graphql-interfaces';
import { KanjiConnection } from '../responses/Kanji';
import { Kanji } from './Kanji';
import { TimeStamp } from './TimeStamp';

@ObjectType({ implements: TimeStamp, description: '部首' })
@Entity()
export class Radical extends TimeStamp {
  constructor(id: number, numberOfStrokes: number, names: string[]) {
    super();
    this.id = id;
    this.numberOfStrokes = numberOfStrokes;
    this.names = names;
  }

  @PrimaryFieldColumn({ name: 'ID', validations: { min: 1 } })
  readonly id: number;

  @IntFieldColumn({ name: '画数', validations: { min: 1 } })
  readonly numberOfStrokes: number;

  @StringArrayFieldColumn({ name: 'なまえ', validations: { presence: true, format: { min: 1, max: 20 } } })
  names: string[];

  //@Field(() => KanjiConnection, { description: '漢字' })
  @OneToMany(() => Kanji, (kanji) => kanji.radical)
  kanjis!: Kanji[];
  //kanjis!: KanjiConnection;

  @RelationId((radical: Radical) => radical.kanjis)
  kanjiIds!: number[];

  @Field(() => String, { description: 'キャラクタ' })
  get character() {
    return String.fromCodePoint(this.id + 0x2eff);
  }
}
