import { installGlobals } from '@remix-run/node';
import '@testing-library/jest-dom/extend-expect';
import 'jest-extended/all';
import { expect } from 'vitest';
import {
  toAcceptPropertyValue,
  toAcceptPropertyValues,
  toAcceptValue,
  toAcceptValues,
  toHaveInvalidMessage,
} from './zod';

expect.extend({ toAcceptValue, toAcceptValues, toAcceptPropertyValue, toAcceptPropertyValues, toHaveInvalidMessage });

installGlobals();
