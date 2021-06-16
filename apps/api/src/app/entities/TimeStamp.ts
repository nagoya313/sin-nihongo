import { Field, InterfaceType } from 'type-graphql';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@InterfaceType({ description: 'タイムスタンプ' })
export abstract class TimeStamp {
  @Field({ description: '作成日時' })
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Field({ description: '更新日時' })
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
