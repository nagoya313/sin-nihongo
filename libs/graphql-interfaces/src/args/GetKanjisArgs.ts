import { ArgsType, Field, Int } from 'type-graphql';
import * as Jf from 'joiful';
import {
  KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER,
  KANJI_QUERY_PARAMS_MATCHER,
  KANJI_UNICODE_PARAMS_MATCHER,
} from './const';

@ArgsType()
export class GetKanjisArgs {
  @Field({ nullable: true, description: '漢字' })
  @(Jf.string().optional().regex(KANJI_QUERY_PARAMS_MATCHER))
  readonly character?: string;

  @Field(() => Int, { nullable: true, description: 'コードポイント' })
  @(Jf.number().integer().optional())
  readonly codePoint?: number;

  @Field({ nullable: true, description: 'ユニコード' })
  @(Jf.string().optional().regex(KANJI_UNICODE_PARAMS_MATCHER))
  readonly unicode?: string;

  @Field({ nullable: true, description: 'よみ' })
  @(Jf.string().optional().regex(KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER))
  /*@WhereQuery(
    (value) =>
      Raw((alias) => `EXISTS(SELECT FROM unnest(array_cat("Kanji"."onyomi", ${alias})) name WHERE name LIKE :name)`, {
        name: `${mojijs.toHalfWidthKana(mojijs.toKatakana(value as string))}%`,
      }),
    'kunyomi'
  )*/
  readonly read?: string;

  @Field({ nullable: true, description: '訓読み' })
  @(Jf.string().optional().regex(KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER))
  /*@WhereQuery(
    (value) =>
      Raw((alias) => `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`, {
        name: `${mojijs.toHalfWidthKana(mojijs.toKatakana(value as string))}%`,
      }),
    'kunyomi'
  )*/
  readonly kunyomi?: string;

  @Field({ nullable: true, description: '音読み' })
  @(Jf.string().optional().regex(KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER))
  /*@WhereQuery(
    (value) =>
      Raw((alias) => `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`, {
        name: `${`${mojijs.toHalfWidthKana(mojijs.toKatakana(value as string))}`}%`,
      }),
    'onyomi'
  )*/
  readonly onyomi?: string;

  @Field(() => Int, { nullable: true, description: '画数' })
  @(Jf.number().integer().optional().min(1))
  readonly numberOfStrokes?: number;

  @Field(() => Int, { nullable: true, description: '部首内画数' })
  @(Jf.number().integer().optional().min(1))
  readonly numberOfStrokesInRadical?: number;

  @Field(() => Int, { nullable: true, description: 'JIS水準' })
  @(Jf.number().integer().optional().min(1).max(2))
  readonly jisLevel?: number;

  @Field({ nullable: true, description: '常用漢字' })
  @(Jf.boolean().optional())
  readonly regular?: boolean;

  @Field({ nullable: true, description: '人名用漢字' })
  @(Jf.boolean().optional())
  readonly forName?: boolean;

  @Field(() => Int, { nullable: true, description: '部首番号' })
  @(Jf.number().integer().optional().min(1))
  readonly radicalId?: number;
}
