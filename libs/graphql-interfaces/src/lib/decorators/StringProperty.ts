import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { CompositionPropertyDecorator } from './CompositionPropertyDecorator';
import { Property } from './Property';
import { PropertyOption } from './PropertyOption';

type StringPropertyValidationOption = { match?: RegExp; min?: number; max?: number; presence?: boolean };
type StringPropertyOption = PropertyOption<StringPropertyValidationOption>;

export const StringProperty = ({
  name,
  field,
  column,
  optional,
  validations,
  description = name,
}: StringPropertyOption) => {
  const decorators = [
    Property({
      optional,
      field: field && { ...field, description },
      column: column,
      validations: validations,
    }),
  ];
  if (validations) {
    const { match, min, max, presence } = validations;
    if (match) {
      decorators.push(Matches(match, { message: `"$value"わ不正な${name}です` }));
    }
    if (min) {
      decorators.push(MinLength(min, { message: `${name}わ$constraint1文字以上で入力してください` }));
    }
    if (max) {
      decorators.push(MaxLength(max, { message: `${name}わ$constraint1文字以下で入力してください` }));
    }
    if (presence) {
      decorators.push(IsNotEmpty({ message: `${name}お入力してください` }));
    }
  }
  return CompositionPropertyDecorator(...decorators);
};

export const StringField = ({ field, ...others }: Omit<StringPropertyOption, 'column'>) =>
  StringProperty({ ...others, field: { ...field } });

export const StringOptionalField = ({ field, ...others }: Omit<StringPropertyOption, 'column' | 'optional'>) =>
  StringProperty({ ...others, optional: true, field: { ...field } });

export const StringFieldColumn = ({ field, column, ...others }: StringPropertyOption) =>
  StringProperty({ ...others, field: { ...field }, column: { ...column } });
