import { ArgsType } from 'type-graphql';
import { StringOptionalField } from '../lib/decorator';

@ArgsType()
export class GetGlyphsArgs {
  @StringOptionalField({ name: 'グリフ名' })
  readonly name?: string;
}
