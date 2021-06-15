import { PropertyOption } from './PropertyOption';

type NumberPropertyValidationOption = { min?: number; max?: number };
export type NumberPropertyOption = PropertyOption<NumberPropertyValidationOption>;
