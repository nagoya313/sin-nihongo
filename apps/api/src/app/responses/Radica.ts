import { ObjectType } from 'type-graphql';
import { Radical } from '../entities/Radical';
import { Paginated } from './Paginated';

@ObjectType()
export class PaginatedRadical extends Paginated(Radical) {}
