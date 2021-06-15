import { ObjectType } from 'type-graphql';
import { Radical } from '../entities/Radical';
import { Connection } from './Connection';

@ObjectType()
export class RadicalConnection extends Connection(Radical) {}
