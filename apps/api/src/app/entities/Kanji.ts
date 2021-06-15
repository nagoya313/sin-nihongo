import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, Min } from 'class-validator';
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

  @Field(() => ID, { description: 'ID' })
  @PrimaryGeneratedColumn()
  @IsInt()
  @Min(1)
  readonly id?: number;

  @Field(() => Int, { description: 'UCS' })
  @Index({ unique: true })
  @Column()
  readonly ucs: number;

  @Field({ description: '常用漢字か否か' })
  @Field()
  @Column()
  regular: boolean;

  @Field({ description: '人名用漢字か否か' })
  @Column()
  forName: boolean;

  @Field(() => Int, { description: '画数' })
  @Column()
  @IsInt()
  @Min(1)
  readonly numberOfStrokes: number;

  @Field(() => Int, { description: '部首内画数' })
  @Column()
  @IsInt()
  readonly numberOfStrokesInRadical: number;

  @Column()
  readonly radicalId: number;

  @Field(() => Int, { description: 'JIS水準' })
  @Column({ nullable: true })
  jisLevel: number;

  @Field(() => [String], { description: '訓読み' })
  @Column('varchar', { array: true, default: {} })
  onyomi: string[];

  @Field(() => [String], { description: '音読み' })
  @Column('varchar', { array: true, default: {} })
  kunyomi: string[];

  @Column({ nullable: true })
  glyphId?: string;

  @Field(() => String)
  get character() {
    return String.fromCodePoint(this.ucs);
  }
}
