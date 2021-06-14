import { CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { Field, InterfaceType } from 'type-graphql';

@InterfaceType()
export abstract class TimeStampEntity extends BaseEntity {
  @Field()
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
