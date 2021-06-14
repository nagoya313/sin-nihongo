import { IsInt, Min } from 'class-validator';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TimeStampEntity } from './TimeStampEntity';

@ObjectType({ implements: TimeStampEntity, description: '部首' })
@Entity()
export class Radical extends TimeStampEntity {
  constructor(id: number, numberOfStrokes: number, names: string[]) {
    super();
    this.id = id;
    this.numberOfStrokes = numberOfStrokes;
    this.names = names;
  }

  @Field(() => ID, { description: 'ID' })
  @PrimaryColumn()
  @IsInt()
  @Min(1)
  readonly id: number;

  @Field(() => Int, { description: '画数' })
  @Column()
  @IsInt()
  @Min(1)
  readonly numberOfStrokes?: number;

  @Field(() => [String], { description: 'なまえ' })
  @Column('varchar', { array: true })
  names: string[];

  @Field(() => String, { description: '部首' })
  get character() {
    return String.fromCodePoint(this.id + 0x2eff);
  }
}
