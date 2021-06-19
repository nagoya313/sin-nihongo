import { AbstractClassType } from '../utils/ClassType';

export const NodedEntity = <TBase extends AbstractClassType>(Base: TBase) => {
  abstract class NodeEntity extends Base {
    get encodedId() {
      return Buffer.from(`${Base.name}:${this.id}`).toString('base64');
    }
  }

  return NodeEntity;
};