import { ArgsType, Field, Int } from 'type-graphql';
import * as Jf from 'joiful';

@ArgsType()
export class CursorConnectionArgs {
  @Field(() => Int)
  @(Jf.number().integer().required().min(1))
  readonly first!: number;

  @Field({ nullable: true })
  @(Jf.string().optional())
  readonly after?: string;
}
