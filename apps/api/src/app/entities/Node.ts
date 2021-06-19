import { ObjectID } from 'typeorm';
import { AbstractClassType } from '../utils/ClassType';

export const NodedEntity = <TBase extends AbstractClassType>(Base: TBase) => {
  abstract class NodeEntity extends Base {
    abstract readonly id?: number | string | ObjectID;

    get encodedId() {
      return Buffer.from(`${Base.name}:${this.id}`).toString('base64');
    }
  }

  return NodeEntity;
};
