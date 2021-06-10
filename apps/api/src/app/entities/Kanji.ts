import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, Min } from 'class-validator';
import { TimeStampEntity } from './TimeStampEntity';

@Entity()
export class Kanji extends TimeStampEntity {
  constructor() {
    super();
    this.regular = false;
    this.forName = false;
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
  readonly jisLevel?: number | null;

  @Column('varchar', { array: true, default: {} })
  onyomi: string[];

  @Column('varchar', { array: true, default: {} })
  kunyomi: string[];

  @Column({ nullable: true })
  glyphId: string;
}
