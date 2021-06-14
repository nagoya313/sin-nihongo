import { Field, ObjectType } from 'type-graphql';
import { Radical as RadicalEntity } from '../entities/Radical';
import { TimeStampEntity } from '../entities/TimeStampEntity';

@ObjectType({ implements: [RadicalEntity, TimeStampEntity], description: '部首' })
export class Radical extends RadicalEntity {
  @Field(() => String, { description: '部首' })
  get character() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return String.fromCodePoint(this.id! + 0x2eff);
  }
}
