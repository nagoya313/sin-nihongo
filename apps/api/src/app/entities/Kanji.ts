import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsInt, Min } from 'class-validator';
import { JisLevel } from './JisLevel';
import { Radical } from './Radical';
import { TimeStampEntity } from './TimeStampEntity';

@Entity()
export class Kanji extends TimeStampEntity {
  constructor(id: number) {
    super();
    this.id = id;
    this.regular = false;
    this.forName = false;
    this.kunyomis = [];
    this.onyomis = [];
  }

  @PrimaryColumn()
  @IsInt()
  @Min(1)
  readonly id: number;

  @Column()
  regular: boolean;

  @Column()
  forName: boolean;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  numberOfStrokes: number;

  @Column({ nullable: true })
  @IsInt()
  numberOfStrokesInRadical: number;

  @Column()
  radicalId: number;

  @ManyToOne(() => Radical, (radical) => radical.kanjis)
  @JoinColumn()
  radical: Radical;

  @Column({ nullable: true })
  jisLevelId?: number | null;

  @ManyToOne(() => JisLevel, (jisLevel) => jisLevel.kanjis)
  @JoinColumn()
  jisLevel: JisLevel;

  @Column('varchar', { array: true, default: {} })
  onyomis: string[];

  @Column('varchar', { array: true, default: {} })
  kunyomis: string[];

  @Column({ nullable: true })
  glyphId: string;
}
