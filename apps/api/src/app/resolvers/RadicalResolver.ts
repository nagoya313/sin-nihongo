import { ObjectType, Resolver } from 'type-graphql';
import { Connection } from './Connection';
import { ConnectionResolver } from './ConnectionResolver';
import { Radical, GetRadicalsArgs } from '@sin-nihongo/graphql-interfaces';
import { Radical as RadicalEntity } from '../entities/pg/Radical';

@ObjectType()
export class RadicalConnection extends Connection(Radical, GetRadicalsArgs, RadicalEntity) {}

@Resolver(() => RadicalConnection)
export class RadicalConnectionResolver extends ConnectionResolver(RadicalConnection, 'pg') {}
