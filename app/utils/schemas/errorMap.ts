import { ZodIssueCode, type ErrorMapCtx, type ZodIssueOptionalMessage } from 'zod';

export const errorMap = (issue: ZodIssueOptionalMessage, ctx: ErrorMapCtx): { message: string } => {
  let message: string;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === 'undefined') {
        message = '必須項目です';
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${issue.keys.map((k) => `'${k}'`).join(', ')}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${issue.options
        .map((val) => (typeof val === 'string' ? `'${val}'` : val))
        .join(' | ')}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${issue.options
        .map((val) => (typeof val === 'string' ? `'${val}'` : val))
        .join(' | ')}`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (issue.validation !== 'regex') message = `Invalid ${issue.validation}`;
      else message = 'Invalid';
      break;
    case ZodIssueCode.too_small:
      if (issue.type === 'array')
        message = `Array must contain ${issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === 'string')
        message = `${issue.minimum}文字${issue.inclusive ? '以上' : '超過'}で入力してください`;
      else if (issue.type === 'number')
        message = `${issue.minimum}${issue.inclusive ? '以上' : '超過'}で入力してください`;
      else message = 'Invalid input';
      break;
    case ZodIssueCode.too_big:
      if (issue.type === 'array')
        message = `Array must contain ${issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === 'string')
        message = `${issue.maximum}文字${issue.inclusive ? '以内' : '未満'}で入力してください`;
      else if (issue.type === 'number')
        message = `${issue.maximum}${issue.inclusive ? '以下' : '未満'}で入力してください`;
      else message = 'Invalid input';
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    default:
      return { message: ctx.defaultError };
  }
  return { message };
};
