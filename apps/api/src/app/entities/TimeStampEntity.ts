import { Field, InterfaceType } from 'type-graphql';
import { CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

@InterfaceType({ description: 'タイムスタンプ' })
export abstract class TimeStampEntity extends BaseEntity {
  @Field({ description: '作成日時' })
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Field({ description: '更新日時' })
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
