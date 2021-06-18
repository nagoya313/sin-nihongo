import { ArgsType, ClassType, Field } from 'type-graphql';
import * as Jf from 'joiful';

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

@ArgsType()
export class OrderArgs {
  @Field(() => OrderDirection)
  readonly direction?: OrderDirection;
}

export const OrderableArgs = <Args extends ClassType>(Args: Args, ...fields: string[]): typeof OrderArgs => {
  @ArgsType()
  class OrderArgsClass extends Args {
    @Field(() => OrderDirection, { nullable: true })
    @(Jf.string().optional()) // 書いておかないとjoifulが誤爆する
    readonly direction?: OrderDirection;

    @Field({ nullable: true })
    @(Jf.string().optional().valid(fields))
    readonly field?: string;
  }
  return OrderArgsClass;
};
