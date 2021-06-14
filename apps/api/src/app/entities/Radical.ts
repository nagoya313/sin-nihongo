import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Field, InterfaceType } from 'type-graphql';
import { IsInt, Min } from 'class-validator';
import { TimeStampEntity } from './TimeStampEntity';

@InterfaceType({ implements: TimeStampEntity })
@Entity()
export class Radical extends TimeStampEntity {
  constructor(id: number, numberOfStrokes: number, names: string[]) {
    super();
    this.id = id;
    this.numberOfStrokes = numberOfStrokes;
    this.names = names;
  }

  @Field()
  @PrimaryColumn()
  @IsInt()
  @Min(1)
  readonly id: number;

  @Field()
  @Column()
  @IsInt()
  @Min(1)
  numberOfStrokes: number;

  @Field(() => [String])
  @Column('varchar', { array: true })
  names: string[];
}
