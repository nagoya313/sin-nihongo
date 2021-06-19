import { ObjectType } from 'type-graphql';
import { KageGlyph } from './KageGlyph';
import { Node } from './Node';
import { TimeStamp } from './TimeStamp';

@ObjectType({ implements: [Node, KageGlyph, TimeStamp], description: 'グリフ' })
export abstract class Glyph extends KageGlyph implements Node, TimeStamp {
  abstract readonly encodedId?: string;
  abstract readonly createdAt?: Date;
  abstract readonly updatedAt?: Date;

  readonly includeGlyphs: unknown;
  readonly drawNecessaryGlyphs: unknown;
}
