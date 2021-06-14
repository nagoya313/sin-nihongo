import { Raw } from 'typeorm';
import { Args, ArgsType, Field, ObjectType, Query, Resolver } from 'type-graphql';
import { GetRadicalsParams } from '@sin-nihongo/sin-nihongo-params';
import { Radical } from '../entities/Radical';
import { TimeStampEntity } from '../entities/TimeStampEntity';
import { findManyOptions, undefinedSkipParams } from '../repositories/EntityRepository';

export class RadicalRepository {
  static findAndCount({ nameLike, numberOfStrokes }: GetGlyphwikiArgs) {
    return Radical.findAndCount(
      findManyOptions<Radical>(
        {
          numberOfStrokes: undefinedSkipParams(numberOfStrokes),
          names: undefinedSkipParams(
            nameLike,
            Raw((alias) => `EXISTS(SELECT FROM unnest(${alias}) name WHERE name LIKE :name)`, {
              name: `${nameLike}%`,
            })
          ),
        },
        {}
      )
    );
  }
}

@ArgsType()
export class GetGlyphwikiArgs extends GetRadicalsParams {
  @Field({ nullable: true })
  nameLike?: string;

  @Field({ nullable: true })
  numberOfStrokes?: number;
}

@ObjectType({ implements: [Radical, TimeStampEntity] })
export class RadicalResponse extends Radical {
  @Field(() => String)
  get character() {
    return String.fromCodePoint(this.id + 0x2eff);
  }
}

@Resolver()
export class RadicalResolver {
  @Query(() => [RadicalResponse])
  async radicals(@Args() args: GetGlyphwikiArgs) {
    const [entities, count] = await RadicalRepository.findAndCount(args);
    return entities;
  }
}
