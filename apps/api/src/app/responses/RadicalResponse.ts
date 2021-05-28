import { Radical as ApiRadical } from '@sin-nihongo/api-interfaces';
import { Radical as EntityRadical } from '../entities/Radical';
import { EntityResponse } from './EntityResponse';

export class RadicalResponse extends EntityResponse<EntityRadical, ApiRadical> {
  toResponse(radical: EntityRadical): ApiRadical {
    return {
      id: radical.id,
      numberOfStrokes: radical.numberOfStrokes,
      names: radical.names,
      character: String.fromCodePoint(radical.id + 0x2eff),
    };
  }
}
