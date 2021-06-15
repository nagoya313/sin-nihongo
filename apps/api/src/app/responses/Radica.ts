import { ObjectType } from 'type-graphql';
import { GetRadicalsArgs } from '@sin-nihongo/graphql-interfaces';
import { Radical } from '../entities/Radical';
import { Connection } from './Connection';

@ObjectType()
export class RadicalConnection extends Connection(Radical) {
  readonly args!: GetRadicalsArgs;
}
