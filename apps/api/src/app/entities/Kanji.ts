import { Column, Entity, Index, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Expose } from 'class-transformer';
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
  readonly id?: number;

  @Expose()
  @Index({ unique: true })
  @Column()
  ucs: number;

  @Expose()
  @Column()
  regular: boolean;

  @Expose()
  @Column()
  forName: boolean;

  @Expose()
  @Column()
  @IsInt()
  @Min(1)
  numberOfStrokes: number;

  @Column()
  @IsInt()
  numberOfStrokesInRadical: number;

  @Column()
  radicalId: number;

  /*
  @ManyToOne(() => Radical, (radical) => radical.kanjis)
  @JoinColumn()
  radical: Radical;
  */

  @Expose()
  @Column({ nullable: true })
  jisLevel?: number | null;

  @Expose()
  @Column('varchar', { array: true, default: {} })
  onyomi: string[];

  @Expose()
  @Column('varchar', { array: true, default: {} })
  kunyomi: string[];

  @Expose()
  @Column({ nullable: true })
  glyphId: string;

  @Expose()
  get radical() {
    return {
      id: this.radicalId,
      character: String.fromCodePoint(this.radicalId + 0x2eff),
    };
  }

  @Expose()
  get character() {
    return String.fromCodePoint(this.ucs);
  }
}
