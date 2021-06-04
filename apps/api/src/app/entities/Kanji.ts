import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsInt, Min } from 'class-validator';
import { Radical } from './Radical';
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
  readonly id: number;

  @Column()
  ucs: number;

  @Column()
  regular: boolean;

  @Column()
  forName: boolean;

  @Column()
  @IsInt()
  @Min(1)
  numberOfStrokes: number;

  @Column()
  @IsInt()
  numberOfStrokesInRadical: number;

  @Column()
  radicalId: number;

  @ManyToOne(() => Radical, (radical) => radical.kanjis)
  @JoinColumn()
  radical: Radical;

  @Column({ nullable: true })
  jisLevel?: number | null;

  @Column('varchar', { array: true, default: {} })
  onyomi: string[];

  @Column('varchar', { array: true, default: {} })
  kunyomi: string[];

  @Column({ nullable: true })
  glyphId: string;
}
