import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractClassType } from '../libs/ClassType';

export const TimeStampedEntity = <TBase extends AbstractClassType>(Base: TBase) => {
  abstract class TimeStampEntity extends Base {
    @CreateDateColumn()
    readonly createdAt?: Date;

    @UpdateDateColumn()
    readonly updatedAt?: Date;
  }

  return TimeStampEntity;
};
