import { ArgsType, Field } from 'type-graphql';
import * as Jf from 'joiful';

@ArgsType()
export class GetGlyphsArgs {
  @Field({ nullable: true, description: 'グリフ名' })
  @(Jf.string().optional())
  readonly name?: string;
}
