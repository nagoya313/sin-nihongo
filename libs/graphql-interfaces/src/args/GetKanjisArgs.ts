import { ArgsType } from 'type-graphql';
import {
  KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER,
  KANJI_QUERY_PARAMS_MATCHER,
  KANJI_UNICODE_PARAMS_MATCHER,
} from '../lib/const';
import { BooleanOptionalField, IntOptionalField, StringOptionalField } from '../lib/decorator';
import { TypeOrmQueries, WhereQuery } from './TypeOrmQueries';

@ArgsType()
export class GetKanjisArgs extends TypeOrmQueries<GetKanjisArgs> {
  @StringOptionalField({ name: '漢字', validations: { match: KANJI_QUERY_PARAMS_MATCHER } })
  readonly character?: string;

  @IntOptionalField({ name: 'コードポイント', validations: { min: 1 } })
  readonly codePoint?: number;

  @StringOptionalField({ name: 'ユニコード', validations: { match: KANJI_UNICODE_PARAMS_MATCHER } })
  readonly unicode?: string;

  @StringOptionalField({ name: 'よみ', validations: { match: KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER } })
  readonly read?: string;

  @StringOptionalField({ name: '訓読み', validations: { match: KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER } })
  readonly kunyomi?: string;

  @StringOptionalField({ name: '音読み', validations: { match: KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER } })
  readonly onyomi?: string;

  @IntOptionalField({ name: '画数', validations: { min: 1 } })
  readonly numberOfStrokes?: number;

  @IntOptionalField({ name: '部首内画数', validations: { min: 1 } })
  readonly numberOfStrokesInRadical?: number;

  @IntOptionalField({ name: 'JIS水準', validations: { min: 1, max: 4 } })
  readonly jisLevel?: number;

  @BooleanOptionalField({ name: '常用漢字' })
  readonly regular?: boolean;

  @BooleanOptionalField({ name: '人名用漢字' })
  readonly forName?: boolean;

  @IntOptionalField({ name: '部首番号', validations: { min: 1 } })
  @WhereQuery()
  radicalId?: number;
}
