import { Resolver } from 'type-graphql';
import { ConnectionResolver } from './ConnectionResolver';
import { RadicalConnection, Radical } from '@sin-nihongo/graphql-interfaces';
import { WhereQuery } from '../decorators/WhereQuery';
import { QueryBuilder, unnestLike } from '../services/QueryBuilder';
import { Radical as RadicalEntity } from '../entities/pg/Radical';

class RadicalQueryBuilder extends QueryBuilder(RadicalEntity, Radical, 'pg') {
  @WhereQuery(unnestLike, 'names')
  name?: string;

  @WhereQuery()
  numberOfStrokes?: number;
}

@Resolver(() => RadicalConnection)
export class RadicalConnectionResolver extends ConnectionResolver(RadicalConnection, RadicalQueryBuilder) {}
