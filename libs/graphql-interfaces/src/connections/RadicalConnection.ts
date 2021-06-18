import { ObjectType } from 'type-graphql';
import { Connection } from './Connection';
import { GetRadicalsArgs } from '../args/GetRadicalsArgs';
import { Radical } from '../types/Radical';

@ObjectType()
export class RadicalConnection extends Connection(Radical) {
  readonly argsType = GetRadicalsArgs;
}
