import { Expose } from 'class-transformer';
import {
  IsBoolean as CVIsBoolean,
  IsInt as CVIsInt,
  IsNotEmpty as CVIsNotEmpty,
  Length as CVLength,
  Max as CVMax,
  Min as CVMin,
  Matches as CVMatches,
  ValidationArguments,
} from 'class-validator';

export const ParamsExpose = Expose({ groups: ['params'] });
export const QueryExpose = Expose({ groups: ['params', 'where'] });
export const CustomQueryExpose = Expose({ groups: ['where'] });
export const PaginationExpose = Expose({ groups: ['pagination'] });

export const IsBoolean = CVIsBoolean({
  message: (validationArguments: ValidationArguments) => `${validationArguments.property}わ真偽値で入力してください`,
});

export const IsInt = CVIsInt({
  message: (validationArguments: ValidationArguments) => `${validationArguments.property}わ整数で入力してください`,
});

export const IsNotEmpty = CVIsNotEmpty({
  message: (validationArguments: ValidationArguments) => `${validationArguments.property}お入力してください`,
});

export const Length = (min: number, max: number) =>
  CVLength(min, max, {
    message: (validationArguments: ValidationArguments) =>
      `${validationArguments.property}わ$constraint1文字以上$constraint2文字以内で入力してください`,
  });

export const Max = (max: number) =>
  CVMax(max, {
    message: (validationArguments: ValidationArguments) =>
      `${validationArguments.property}わ$constraint1以下で入力してください`,
  });

export const Min = (max: number) =>
  CVMin(max, {
    message: (validationArguments: ValidationArguments) =>
      `${validationArguments.property}わ$constraint1以上で入力してください`,
  });

export const Matches = (pattern: RegExp) =>
  CVMatches(pattern, {
    message: (validationArguments: ValidationArguments) => `"$value"わ不正な${validationArguments.property}です`,
  });
