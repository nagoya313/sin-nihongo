import { IsBoolean, IsInt, IsOptional, Matches, Max, Min } from 'class-validator';
import { Field, Int } from 'type-graphql';

const CompositionPropertyDecorator = (...decorators: PropertyDecorator[]): PropertyDecorator => (target, propertyKey) =>
  decorators.reverse().forEach((decorator) => decorator(target, propertyKey));

type OptinalFieldOption = {
  returnTypeFunction?: Parameters<typeof Field>[0];
  validate?: boolean;
  description?: string;
};

const OptionalField = ({ returnTypeFunction, validate, description }: OptinalFieldOption) => {
  const decorators: PropertyDecorator[] = [];
  if (returnTypeFunction) {
    decorators.push(Field(returnTypeFunction, { nullable: true, description }));
  } else {
    decorators.push(Field({ nullable: true, description }));
  }
  if (validate) {
    decorators.push(IsOptional());
  }
  return CompositionPropertyDecorator(...decorators);
};

type SetOptionalOption = {
  optional?: true;
  validate?: boolean;
  returnTypeFunction?: Parameters<typeof Field>[0];
  description?: string;
};

const SetOptional = ({ optional, returnTypeFunction, validate, description }: SetOptionalOption) => {
  const decorators: PropertyDecorator[] = [];
  if (optional) {
    decorators.push(OptionalField({ returnTypeFunction, validate, description }));
  } else {
    decorators.push(Field(returnTypeFunction, { description }));
  }
  return decorators;
};

type FieldOption<V> = {
  name: string;
  optional?: true;
  validations?: V;
  description?: string;
};

type StringFieldValidationOption = { match?: RegExp };
type StringFieldOption = FieldOption<StringFieldValidationOption>;

export const StringField = ({ name, optional, validations, description = name }: StringFieldOption) => {
  const decorators = SetOptional({ optional, validate: !!validations, description });
  if (validations) {
    const { match } = validations;
    if (match) {
      decorators.push(Matches(match, { message: `"$value"わ不正な${name}です` }));
    }
  }
  return CompositionPropertyDecorator(...decorators);
};

type NumberFieldValidationOption = { min?: number; max?: number };
type NumberFieldOption = FieldOption<NumberFieldValidationOption>;

export const IntField = ({ name, optional, validations, description = name }: NumberFieldOption) => {
  const decorators = SetOptional({ optional, returnTypeFunction: () => Int, validate: true, description });
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

type BooleanFieldOption = FieldOption<never>;

export const BooleanField = ({ name, optional, description = name }: BooleanFieldOption) => {
  const decorators = SetOptional({ optional, returnTypeFunction: () => Int, validate: true, description });
  decorators.push(IsBoolean({ message: `${name}わ真偽値で入力してください` }));
  return CompositionPropertyDecorator(...decorators);
};
