import { IsOptional } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class GetGlyphsArgs {
  @Field({ nullable: true, description: 'グリフ名' })
  @IsOptional()
  readonly name?: string;
}
