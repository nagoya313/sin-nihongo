import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, Min } from 'class-validator';
import { TimeStampEntity } from './TimeStampEntity';

@Entity()
export class Kanji extends TimeStampEntity {
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

  @PrimaryGeneratedColumn()
  @IsInt()
  @Min(1)
  readonly id?: number;

  @Index({ unique: true })
  @Column()
  readonly ucs: number;

  @Column()
  readonly regular: boolean;

  @Column()
  readonly forName: boolean;

  @Column()
  @IsInt()
  @Min(1)
  readonly numberOfStrokes: number;

  @Column()
  @IsInt()
  readonly numberOfStrokesInRadical: number;

  @Column()
  readonly radicalId: number;

  @Column({ nullable: true })
  readonly jisLevel?: number;

  @Column('varchar', { array: true, default: {} })
  onyomi: string[];

  @Column('varchar', { array: true, default: {} })
  kunyomi: string[];

  @Column({ nullable: true })
  glyphId?: string;
}
