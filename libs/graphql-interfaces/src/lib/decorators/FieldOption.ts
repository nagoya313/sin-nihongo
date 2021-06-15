import { FieldOptions } from 'type-graphql';
import { ReturnTypeFunc } from 'type-graphql/dist/decorators/types';

export type FieldOption = { returnTypeFunction?: ReturnTypeFunc } & FieldOptions;
