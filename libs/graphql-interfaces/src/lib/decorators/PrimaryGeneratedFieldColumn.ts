import { Field, ID } from 'type-graphql';
import { PrimaryGeneratedColumn } from 'typeorm';
import { CompositionPropertyDecorator } from './CompositionPropertyDecorator';
import { NumberPropertyOption } from './NumberPropertyOption';

export const PrimaryGeneratedFieldColumn = ({
  name,
  description = name,
}: Omit<NumberPropertyOption, 'field' | 'column' | 'validations'>) => {
  const decorators: PropertyDecorator[] = [];
  decorators.push(Field(() => ID, { description: description }));
  decorators.push(PrimaryGeneratedColumn());

  return CompositionPropertyDecorator(...decorators);
};
