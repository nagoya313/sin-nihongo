import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Glyph as GlyphType } from '@sin-nihongo/graphql-interfaces';
import { NodedEntity } from '../Node';
import { TimeStampedEntity } from '../TimeStamp';

@Entity()
export class Glyph extends NodedEntity(TimeStampedEntity(GlyphType)) {
  constructor(name: string, data: string) {
    super();
    this.name = name;
    this.data = data;
  }

  @ObjectIdColumn()
  readonly id?: ObjectID;

  @Column({ unique: true })
  name!: string;

  @Column()
  data!: string;
}
