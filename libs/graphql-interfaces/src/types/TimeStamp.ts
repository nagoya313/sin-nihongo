import { Field, InterfaceType } from 'type-graphql';

@InterfaceType({ description: 'タイムスタンプ' })
export abstract class TimeStamp {
  @Field({ description: '作成日時' })
  abstract readonly createdAt?: Date;

  @Field({ description: '更新日時' })
  abstract readonly updatedAt?: Date;
}
