import { RadicalResponse as ApiRadicalResponse } from '@sin-nihongo/api-interfaces';
import { Radical } from '../entities/Radical';
import { EntityResponse } from './EntityResponse';

export class RadicalResponse extends EntityResponse<Radical, ApiRadicalResponse> {
  toResponse(radical: Radical): ApiRadicalResponse {
    return {
      id: radical.id,
      numberOfStrokes: radical.numberOfStrokes,
      names: radical.names,
    };
  }
}
