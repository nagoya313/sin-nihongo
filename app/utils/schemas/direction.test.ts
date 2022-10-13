import { describe, expect, it } from 'vitest';
import { direction } from './direction';

describe('direction schema', () => {
  it('default values equal asc', () => {
    expect(direction.parse(undefined)).toBe('asc');
  });

  it('asc or desc only accept', () => {
    expect(direction).toAcceptValues(['asc', 'desc']);
    expect(direction).not.toAcceptValue('abc');
  });
});
