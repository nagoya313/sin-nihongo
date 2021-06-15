import { IsInt, Max, Min } from 'class-validator';
import { Int } from 'type-graphql';
import { CompositionPropertyDecorator } from './CompositionPropertyDecorator';
import { NumberPropertyOption } from './NumberPropertyOption';
import { Property } from './Property';

export const IntProperty = ({
  name,
  field,
  column,
  optional,
  validations,
  description = name,
}: NumberPropertyOption) => {
  const decorators = [
    Property({
      optional,
      field: field && { ...field, returnTypeFunction: () => Int, description },
      column,
      validations: {},
    }),
  ];
  decorators.push(IsInt({ message: `${name}わ整数で入力してください` }));
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

export const IntField = ({ field, ...others }: Omit<NumberPropertyOption, 'column'>) =>
  IntProperty({ ...others, field: { ...field } });

export const IntOptionalField = ({ field, ...others }: Omit<NumberPropertyOption, 'column' | 'optional'>) =>
  IntProperty({ ...others, optional: true, field: { ...field } });

export const IntFieldColumn = ({ field, column, ...others }: NumberPropertyOption) =>
  IntProperty({ ...others, field: { ...field }, column: { ...column } });
