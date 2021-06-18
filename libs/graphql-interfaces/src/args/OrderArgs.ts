import { ArgsType, ClassType, Field } from 'type-graphql';
import { } from 'typeorm';
import * as Jf from 'joiful';

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface OrdarArgs {
  readonly direction?: OrderDirection;
  readonly field?: string;
  get orderQuery(): { [field: string]: OrderDirection } | undefined;
}

export const OrderableArgs = <Args extends ClassType>(Args: Args, ...fields: string[]) => {
  @ArgsType()
  class OrderArgsClass extends Args implements OrdarArgs {
    @Field(() => OrderDirection, { nullable: true, description: '並び替え方向' })
    @(Jf.string().optional()) // 書いておかないとjoifulが誤爆する
    readonly direction?: OrderDirection;

    @Field({ nullable: true, description: '並び替え基準' })
    @(Jf.string().optional().valid(fields))
    readonly field?: string;

    get orderQuery() {
      if (this.field) {
        return { [this.field]: this.direction ?? OrderDirection.ASC }
      }
      return undefined;
    }
  }
  return OrderArgsClass;
};
