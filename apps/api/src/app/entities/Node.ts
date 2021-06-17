import { AbstractClassType } from '../libs/ClassType';

export const NodedEntity = <TBase extends AbstractClassType>(Base: TBase) => {
  abstract class NodeEntity extends Base {
    get encodedId() {
      return Buffer.from(`GlyphwikiGlyph:${this.id}`).toString('base64');
    }
  }

  return NodeEntity;
};
