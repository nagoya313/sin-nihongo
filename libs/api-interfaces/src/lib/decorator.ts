import { ValidationOptions, ValidateIf } from 'class-validator';

export const IsOptional = (validationOptions?: ValidationOptions) =>
  ValidateIf(
    (_obj, value) => value !== null && value !== undefined && value !== '' && !Number.isNaN(value),
    validationOptions
  );
