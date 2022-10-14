import { describe, expect, it } from 'vitest';
import { booleanRadio } from './booleanRadio';

describe('booleanRadio schema', () => {
  it('default values equal none', () => {
    expect(booleanRadio.parse(undefined)).toBe('none');
  });

  it('none or true or false only accept', () => {
    expect(booleanRadio).toAcceptValues(['none', 'true', 'false']);
    expect(booleanRadio).not.toAcceptValue('abc');
  });
});
