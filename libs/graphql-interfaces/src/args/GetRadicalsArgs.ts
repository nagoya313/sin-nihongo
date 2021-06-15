import { ArgsType } from 'type-graphql';
import { RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } from '../lib/const';
import { IntOptionalField, StringOptionalField } from '../lib/decorator';

@ArgsType()
export class GetRadicalsArgs {
  @StringOptionalField({ name: 'よみ', validations: { match: RADICALS_QUERY_PARAMS_NAME_LIKE_MATCHER } })
  name?: string;

  @IntOptionalField({ name: '画数', validations: { min: 1 } })
  numberOfStrokes?: number;
}
