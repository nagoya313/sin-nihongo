import { ArgsType } from 'type-graphql';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from '../lib/const';
import { IntField, StringField } from '../lib/decorator';

@ArgsType()
export class GetRadicalsArgs {
  @StringField({ name: 'よみ', optional: true, validations: { match: RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } })
  name?: string;

  @IntField({ name: '画数', optional: true, validations: { min: 1 } })
  numberOfStrokes?: number;
}
