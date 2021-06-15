import { Max, Min } from 'class-validator';
import { Field, ID } from 'type-graphql';
import { PrimaryColumn } from 'typeorm';
import { CompositionPropertyDecorator } from './CompositionPropertyDecorator';
import { NumberPropertyOption } from './NumberPropertyOption';

export const PrimaryFieldColumn = ({
  name,
  validations,
  description = name,
}: Omit<NumberPropertyOption, 'field' | 'column'>) => {
  const decorators: PropertyDecorator[] = [];
  decorators.push(Field(() => ID, { description: description }));
  decorators.push(PrimaryColumn());

  if (validations) {
    const { min, max } = validations;
    if (min) {
      decorators.push(Min(min, { message: `${name}わ$constraint1以上で入力してください` }));
    }
    if (max) {
      decorators.push(Max(max, { message: `${name}わ$constraint1以下で入力してください` }));
    }
  }
  return CompositionPropertyDecorator(...decorators);
};
