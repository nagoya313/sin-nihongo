import { ArgsType, Field, Int } from 'type-graphql';
import { Raw } from 'typeorm';
import * as Jf from 'joiful';
import mojijs from 'mojijs';
import {
  KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER,
  KANJI_QUERY_PARAMS_MATCHER,
  KANJI_UNICODE_PARAMS_MATCHER,
} from '../lib/const';
import { TypeOrmQueries, WhereQuery } from './TypeOrmQueries';

@ArgsType()
export class GetKanjisArgs extends TypeOrmQueries<GetKanjisArgs> {
  @Field({ nullable: true, description: '漢字' })
  @(Jf.string().optional().regex(KANJI_QUERY_PARAMS_MATCHER))
  @WhereQuery()
  readonly character?: string;

  @Field(() => Int, { nullable: true, description: 'コードポイント' })
  @WhereQuery()
  @(Jf.number().integer().optional())
  readonly codePoint?: number;

  @Field({ nullable: true, description: 'ユニコード' })
  @(Jf.string().optional().regex(KANJI_UNICODE_PARAMS_MATCHER))
  @WhereQuery()
  readonly unicode?: string;

  @Field({ nullable: true, description: 'よみ' })
  @(Jf.string().optional().regex(KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER))
  @WhereQuery(
    (value) =>
      Raw((alias) => `EXISTS(SELECT FROM unnest(array_cat("Kanji"."onyomi", ${alias})) name WHERE name LIKE :name)`, {
        name: `${mojijs.toHalfWidthKana(mojijs.toKatakana(value as string))}%`,
      }),
    'kunyomi'
  )
  readonly read?: string;

  @Field({ nullable: true, description: '訓読み' })
  @(Jf.string().optional().regex(KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER))
  @WhereQuery(
    (value) =>
      Raw((alias) => `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`, {
        name: `${mojijs.toHalfWidthKana(mojijs.toKatakana(value as string))}%`,
      }),
    'kunyomi'
  )
  readonly kunyomi?: string;

  @Field({ nullable: true, description: '音読み' })
  @(Jf.string().optional().regex(KANJIS_QUERY_PARAMS_READ_LIKE_MATCHER))
  @WhereQuery(
    (value) =>
      Raw((alias) => `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`, {
        name: `${`${mojijs.toHalfWidthKana(mojijs.toKatakana(value as string))}`}%`,
      }),
    'onyomi'
  )
  readonly onyomi?: string;

  @Field(() => Int, { nullable: true, description: '画数' })
  @(Jf.number().integer().optional().min(1))
  @WhereQuery()
  readonly numberOfStrokes?: number;

  @Field(() => Int, { nullable: true, description: '部首内画数' })
  @(Jf.number().integer().optional().min(1))
  @WhereQuery()
  readonly numberOfStrokesInRadical?: number;

  @Field(() => Int, { nullable: true, description: 'JIS水準' })
  @(Jf.number().integer().optional().min(1).max(2))
  @WhereQuery()
  readonly jisLevel?: number;

  @Field({ nullable: true, description: '常用漢字' })
  @(Jf.boolean().optional())
  @WhereQuery()
  readonly regular?: boolean;

  @Field({ nullable: true, description: '人名用漢字' })
  @(Jf.boolean().optional())
  @WhereQuery()
  readonly forName?: boolean;

  @Field(() => Int, { nullable: true, description: '部首番号' })
  @(Jf.number().integer().optional().min(1))
  @WhereQuery()
  readonly radicalId?: number;
}
