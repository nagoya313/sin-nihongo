import { Buffer } from 'buffer';
import { Arg, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';
import { Node } from '@sin-nihongo/graphql-interfaces';
import { Radical } from '../entities/pg/Radical';

@Resolver()
export class NodeResolver {
  @Query(() => Node, { nullable: true })
  node(@Arg('id') id: string): Promise<Node | undefined> {
    const decodedId = Buffer.from(id, 'base64').toString();
    return getRepository(Radical, 'pg').findOne(1);
  }
}
