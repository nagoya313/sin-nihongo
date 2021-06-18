import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Kanji as KanjiType } from '@sin-nihongo/graphql-interfaces';
import { Radical } from './Radical';
import { NodedEntity } from '../Node';
import { TimeStampedEntity } from '../TimeStamp';

@Entity()
export class Kanji extends TimeStampedEntity(NodedEntity(KanjiType)) {
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

  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column({ unique: true })
  readonly codePoint!: number;

  @Column()
  regular: boolean;

  @Column()
  forName: boolean;

  @Column({ type: 'int2' })
  readonly numberOfStrokes: number;

  @Column({ type: 'int2' })
  readonly numberOfStrokesInRadical: number;

  @ManyToOne(() => Radical, (radical) => radical.kanjis)
  readonly radical!: Radical;

  @RelationId((kanji: Kanji) => kanji.radical)
  @Column()
  readonly radicalId: number;

  @Column({ type: 'int2' })
  jisLevel: number;

  @Column('varchar', { array: true })
  onyomi: string[];

  @Column('varchar', { array: true })
  kunyomi: string[];

  @Column({ nullable: true })
  glyphId?: string;
}
