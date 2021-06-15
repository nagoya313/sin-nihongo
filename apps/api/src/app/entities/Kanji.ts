import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { BooleanFieldColumn, IntFieldColumn, StringArrayFieldColumn } from '@sin-nihongo/graphql-interfaces';
import { Radical } from './Radical';
import { TimeStamp } from './TimeStamp';

@ObjectType({ implements: TimeStamp })
@Entity()
export class Kanji extends TimeStamp {
  constructor(
    ucs: number,
    regular: boolean,
    forName: boolean,
    numberOfStrokes: number,
    numberOfStrokesInRadical: number,
    radicalId: number,
    jisLevel: number
  ) {
    super();
    this.ucs = ucs;
    this.regular = regular;
    this.forName = forName;
    this.numberOfStrokes = numberOfStrokes;
    this.numberOfStrokesInRadical = numberOfStrokesInRadical;
    this.radicalId = radicalId;
    this.jisLevel = jisLevel;
    this.kunyomi = [];
    this.onyomi = [];
  }

  @PrimaryGeneratedColumn({ name: 'ID' })
  readonly id?: number;

  @IntFieldColumn({ name: 'JIS水準', optional: true, column: { unique: true }, validations: { min: 1, max: 4 } })
  readonly ucs: number;

  @BooleanFieldColumn({ name: '常用漢字' })
  regular: boolean;

  @BooleanFieldColumn({ name: '人名用漢字' })
  forName: boolean;

  @IntFieldColumn({ name: '画数', validations: { min: 1 } })
  readonly numberOfStrokes: number;

  @IntFieldColumn({ name: '部首内画数' })
  readonly numberOfStrokesInRadical: number;

  @ManyToOne(() => Radical, (radical) => radical.kanjis)
  readonly radical!: Radical;

  @RelationId((kanji: Kanji) => kanji.radical)
  @Column()
  readonly radicalId: number;

  @IntFieldColumn({ name: 'JIS水準', optional: true, validations: { min: 1, max: 4 } })
  jisLevel: number;

  @StringArrayFieldColumn({ name: '訓読み', validations: { presence: true, format: { min: 1, max: 20 } } })
  onyomi: string[];

  @StringArrayFieldColumn({ name: '音読み', validations: { presence: true, format: { min: 1, max: 20 } } })
  kunyomi: string[];

  @Column({ nullable: true })
  glyphId?: string;

  @Field(() => String, { description: 'キャラクタ' })
  get character() {
    return String.fromCodePoint(this.ucs);
  }
}
