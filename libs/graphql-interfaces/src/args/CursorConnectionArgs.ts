import { ArgsType, ClassType, Field, Int } from 'type-graphql';
import * as Jf from 'joiful';

export interface CursorConnectionArgs {
  readonly first: number;
  readonly after?: string;
}

export const CursorConnectableArgs = <Args extends ClassType>(Args: Args) => {
  @ArgsType()
  class CursorConnectionArgsClass extends Args implements CursorConnectionArgs {
    @Field(() => Int)
    @(Jf.number().integer().required().min(1))
    readonly first!: number;

    @Field({ nullable: true })
    @(Jf.string().optional())
    readonly after?: string;
  }
  return CursorConnectionArgsClass;
};
