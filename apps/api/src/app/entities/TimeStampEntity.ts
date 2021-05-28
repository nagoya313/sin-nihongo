import { CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

export class TimeStampEntity extends BaseEntity {
  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;
}
