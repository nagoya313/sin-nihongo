import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Kanji } from './Kanji';
import { TimeStamp } from '../TimeStamp';

@ObjectType({ implements: TimeStamp, description: '部首' })
@Entity()
export class Radical extends TimeStamp {
  constructor(codePoint: number, numberOfStrokes: number, names: string[]) {
    super();
    this.codePoint = codePoint;
    this.numberOfStrokes = numberOfStrokes;
    this.names = names;
  }

  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Field(() => Int, { description: 'コードポイント' })
  @Column({ unique: true })
  readonly codePoint: number;

  @Field({ description: '画数' })
  @Column({ type: 'int2' })
  readonly numberOfStrokes: number;

  @Field(() => [String], { description: '名称' })
  @Column('varchar', { array: true })
  names: string[];

  @OneToMany(() => Kanji, (kanji) => kanji.radical)
  kanjis!: Kanji[];

  @Field(() => String, { description: 'キャラクタ' })
  get character() {
    return String.fromCodePoint(this.codePoint);
  }
}
