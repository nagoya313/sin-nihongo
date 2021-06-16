import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { TimeStamp } from '../TimeStamp';

@ObjectType({ implements: TimeStamp, description: 'グリフ' })
@Entity()
export class Glyph extends TimeStamp {
  constructor(name: string, data: string) {
    super();
    this.name = name;
    this.data = data;
  }

  @Field(() => ID, { description: 'ID' })
  @ObjectIdColumn()
  readonly id?: ObjectID;

  @Field({ description: '名称' })
  @Column({ unique: true })
  name!: string;

  @Field({ description: 'KAGEデータ' })
  @Column()
  data!: string;
}
