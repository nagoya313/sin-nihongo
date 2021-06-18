import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Radical as RadicalType } from '@sin-nihongo/graphql-interfaces';
import { Kanji } from './Kanji';
import { NodedEntity } from '../Node';
import { TimeStampedEntity } from '../TimeStamp';

@Entity()
export class Radical extends TimeStampedEntity(NodedEntity(RadicalType)) {
  constructor(codePoint: number, numberOfStrokes: number, names: string[]) {
    super();
    this.codePoint = codePoint;
    this.numberOfStrokes = numberOfStrokes;
    this.names = names;
  }

  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Column({ unique: true })
  readonly codePoint: number;

  @Column({ type: 'int2' })
  readonly numberOfStrokes: number;

  @Column('varchar', { array: true })
  names: string[];

  @OneToMany(() => Kanji, (kanji) => kanji.radical)
  kanjis!: Kanji[];
}
