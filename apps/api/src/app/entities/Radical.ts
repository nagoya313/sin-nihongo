import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IsInt, Min } from 'class-validator';
import { Kanji } from './Kanji';
import { TimeStampEntity } from './TimeStampEntity';

@Entity()
export class Radical extends TimeStampEntity {
  constructor(id: number, numberOfStrokes: number, names: string[]) {
    super();
    this.id = id;
    this.numberOfStrokes = numberOfStrokes;
    this.names = names;
  }

  @PrimaryColumn()
  @IsInt()
  @Min(1)
  readonly id: number;

  @Column()
  @IsInt()
  @Min(1)
  numberOfStrokes: number;

  @Column('varchar', { array: true })
  names: string[];

  @OneToMany(() => Kanji, (kanji) => kanji.radical)
  kanjis: Kanji[];
}
