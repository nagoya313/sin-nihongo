import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'サイト情報' })
export class Info {
  @Field({ description: 'グリフウィキからグリフお取得可能かどうか' })
  readonly glyphwikiAccessible!: boolean;
}
