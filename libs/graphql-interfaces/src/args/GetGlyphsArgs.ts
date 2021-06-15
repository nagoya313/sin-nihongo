import { ArgsType } from 'type-graphql';
import { StringField } from '../lib/decorator';

@ArgsType()
export class GetGlyphsArgs {
  @StringField({ name: 'グリフ名', optional: true })
  readonly name?: string;
}
