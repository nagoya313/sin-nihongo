import { expect } from '@jest/globals';
import { isOptionalProperty } from './isOptionalProperty';
import { isIntProperty } from './isIntProperty';
import { minProperty } from './minProperty';
import { allowValueProperty } from './allowValueProperty';
import { maxProperty } from './maxProperty';

expect.extend({
  isOptionalProperty,
  isIntProperty,
  minProperty,
  maxProperty,
  allowValueProperty,
});
