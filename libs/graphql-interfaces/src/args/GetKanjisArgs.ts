import { ArgsType } from 'type-graphql';
import { KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER, KANJI_USC_QUERY_PARAMS_MATCHER } from '../lib/const';
import { BooleanField, IntField, StringField } from '../lib/decorator';

@ArgsType()
export class GetKanjisArgs {
  @StringField({ name: '漢字', optional: true, validations: { match: KANJI_USC_QUERY_PARAMS_MATCHER } })
  readonly character?: string;

  @IntField({ name: 'コードポイント', optional: true, validations: { min: 1 } })
  readonly codePoint?: string;

  @StringField({ name: 'ユニコード', optional: true, validations: { match: KANJI_USC_QUERY_PARAMS_MATCHER } })
  readonly unicode?: string;

  @StringField({ name: 'よみ', optional: true, validations: { match: KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER } })
  readonly read?: string;

  @StringField({ name: '訓読み', optional: true, validations: { match: KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER } })
  readonly kunyomi?: string;

  @StringField({ name: '音読み', optional: true, validations: { match: KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER } })
  readonly onyomi?: string;

  @IntField({ name: '画数', optional: true, validations: { min: 1 } })
  readonly numberOfStrokes?: number;

  @IntField({ name: '部首内画数', optional: true, validations: { min: 1 } })
  readonly numberOfStrokesInRadical?: number;

  @IntField({ name: 'JIS水準', optional: true, validations: { min: 1, max: 4 } })
  readonly jisLevel?: number;

  @BooleanField({ name: '常用漢字', optional: true })
  readonly regular?: boolean;

  @BooleanField({ name: '人名用漢字', optional: true })
  readonly forName?: boolean;

  @IntField({ name: '部首番号', optional: true, validations: { min: 1 } })
  readonly radicalId?: number;
}
