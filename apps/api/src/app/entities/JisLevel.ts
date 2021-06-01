import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IsInt, Min, Max } from 'class-validator';
import { Kanji } from './Kanji';
import { TimeStampEntity } from './TimeStampEntity';

@Entity()
export class JisLevel extends TimeStampEntity {
  constructor(id: number) {
    super();
    this.id = id;
  }

  @PrimaryColumn()
  @IsInt()
  @Min(1)
  @Max(4)
  readonly id: number;

  @OneToMany(() => Kanji, (kanji) => kanji.radical)
  kanjis: Kanji[];
}
