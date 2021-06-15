import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export const Connection = <T>(T: ClassType<T>) => {
  @ObjectType({ isAbstract: true })
  abstract class ConnectionClass {
    readonly count!: number;

    @Field(() => [T])
    readonly nodes!: T[];

    @Field(() => Int)
    get totalCount() {
      return this.count;
    }
  }
  return ConnectionClass;
};
