import { IsBoolean } from 'class-validator';
import { CompositionPropertyDecorator } from './CompositionPropertyDecorator';
import { Property } from './Property';
import { PropertyOption } from './PropertyOption';

type BooleanPropertyOption = PropertyOption<never>;

export const BooleanProperty = ({ name, field, column, optional, description = name }: BooleanPropertyOption) => {
  const decorators = [Property({ optional, field: field && { ...field, description }, column, validations: {} })];
  decorators.push(IsBoolean({ message: `${name}わ真偽値で入力してください` }));
  return CompositionPropertyDecorator(...decorators);
};

export const BooleanField = ({ field, ...others }: Omit<BooleanPropertyOption, 'column'>) =>
  BooleanProperty({ ...others, field: { ...field } });

export const BooleanOptionalField = ({ field, ...others }: Omit<BooleanPropertyOption, 'column' | 'optional'>) =>
  BooleanProperty({ ...others, optional: true, field: { ...field } });

export const BooleanFieldColumn = ({ field, column, ...others }: BooleanPropertyOption) =>
  BooleanProperty({ ...others, field: { ...field }, column: { ...column } });
