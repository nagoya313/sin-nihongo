import { IsOptional } from 'class-validator';
import { Field } from 'type-graphql';
import { Column, Index } from 'typeorm';
import { CompositionPropertyDecorator } from './CompositionPropertyDecorator';
import { ColumnOption } from './ColumnOption';
import { FieldOption } from './FieldOption';
import { PropertyOption } from './PropertyOption';

const nullableField = ({ returnTypeFunction, ...others }: FieldOption) => {
  if (returnTypeFunction) {
    return Field(returnTypeFunction, { ...others, nullable: true });
  } else {
    return Field({ ...others, nullable: true });
  }
};

const notNullablefield = ({ returnTypeFunction, ...others }: FieldOption) => {
  if (returnTypeFunction) {
    return Field(returnTypeFunction, { ...others });
  } else {
    return Field({ ...others });
  }
};

const nullableColumn = ({ type, options }: ColumnOption) => {
  if (type) {
    return Column(type, { ...options, nullable: true });
  } else {
    return Column({ ...options, nullable: true });
  }
};

const notNullableColumn = ({ type, options }: ColumnOption) => {
  if (type) {
    return Column(type, options);
  } else {
    return Column({ ...options });
  }
};

export const Property = ({ optional, field, column, validations }: Omit<PropertyOption<unknown>, 'name'>) => {
  const decorators: PropertyDecorator[] = [];

  if (optional) {
    if (field) {
      decorators.push(nullableField(field));
    }
    if (column) {
      decorators.push(nullableColumn(column));
    }
    if (validations) {
      decorators.push(IsOptional());
    }
  } else {
    if (field) {
      decorators.push(notNullablefield(field));
    }
    if (column) {
      decorators.push(notNullableColumn(column));
    }
  }

  if (column?.unique) {
    decorators.push(Index({ unique: true }));
  }

  return CompositionPropertyDecorator(...decorators);
};
