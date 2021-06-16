import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Radical } from './Radical';
import { TimeStamp } from '../TimeStamp';

@ObjectType({ implements: TimeStamp })
@Entity()
export class Kanji extends TimeStamp {
  constructor(
    codePoint: number,
    regular: boolean,
    forName: boolean,
    numberOfStrokes: number,
    numberOfStrokesInRadical: number,
    radicalId: number,
    jisLevel: number,
    kunyomi: string[],
    onyomi: string[]
  ) {
    super();
    this.codePoint = codePoint;
    this.regular = regular;
    this.forName = forName;
    this.numberOfStrokes = numberOfStrokes;
    this.numberOfStrokesInRadical = numberOfStrokesInRadical;
    this.radicalId = radicalId;
    this.jisLevel = jisLevel;
    this.kunyomi = kunyomi;
    this.onyomi = onyomi;
  }

  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Field(() => Int, { description: 'コードポイント' })
  @Column({ unique: true })
  readonly codePoint!: number;

  @Field({ description: '常用漢字' })
  @Column()
  regular: boolean;

  @Field({ description: '人名用漢字' })
  @Column()
  forName: boolean;

  @Field(() => Int, { description: '画数' })
  @Column({ type: 'int2' })
  readonly numberOfStrokes: number;

  @Field(() => Int, { description: '部首内画数' })
  @Column({ type: 'int2' })
  readonly numberOfStrokesInRadical: number;

  @ManyToOne(() => Radical, (radical) => radical.kanjis)
  readonly radical!: Radical;

  @RelationId((kanji: Kanji) => kanji.radical)
  @Column()
  readonly radicalId: number;

  @Field(() => Int, { description: 'JIS水準' })
  @Column({ type: 'int2' })
  jisLevel: number;

  @Field(() => [String], { description: '訓読み' })
  @Column('varchar', { array: true })
  onyomi: string[];

  @Field(() => [String], { description: '音読み' })
  @Column('varchar', { array: true })
  kunyomi: string[];

  @Column({ nullable: true })
  glyphId?: string;

  @Field(() => String, { description: 'キャラクタ' })
  get character() {
    return String.fromCodePoint(this.codePoint);
  }
}
