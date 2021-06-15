import { ArrayNotEmpty, ArrayMaxSize, ArrayMinSize, IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { CompositionPropertyDecorator } from './CompositionPropertyDecorator';
import { Property } from './Property';
import { PropertyOption } from './PropertyOption';

type StringPropertyValidationOption = {
  min?: number;
  max?: number;
  presence?: boolean;
  format?: {
    match?: RegExp;
    min?: number;
    max?: number;
    presence?: boolean;
  };
};
type StringPropertyOption = PropertyOption<StringPropertyValidationOption>;

export const StringArrayProperty = ({
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
      field: field && { ...field, returnTypeFunction: () => [String], description },
      column: column && { ...column, type: 'varchar', options: { array: true } },
      validations: validations,
    }),
  ];
  if (validations) {
    const { min, max, presence, format } = validations;
    if (min) {
      decorators.push(ArrayMinSize(min, { message: `${name}わ$constraint1以上で入力してください` }));
    }
    if (max) {
      decorators.push(ArrayMaxSize(max, { message: `${name}わ$constraint1以下で入力してください` }));
    }
    if (presence) {
      decorators.push(ArrayNotEmpty({ message: `${name}お入力してください` }));
    }
    if (format) {
      const { match, min, max, presence } = format;
      if (match) {
        decorators.push(Matches(match, { message: `"$value"わ不正な${name}です`, each: true }));
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
  }
  return CompositionPropertyDecorator(...decorators);
};

export const StringArrayField = ({ field, ...others }: Omit<StringPropertyOption, 'column'>) =>
  StringArrayProperty({ ...others, field: { ...field } });

export const StringArrayOptionalField = ({ field, ...others }: Omit<StringPropertyOption, 'column' | 'optional'>) =>
  StringArrayProperty({ ...others, optional: true, field: { ...field } });

export const StringArrayFieldColumn = ({ field, column, ...others }: StringPropertyOption) =>
  StringArrayProperty({ ...others, field: { ...field }, column: { ...column } });
