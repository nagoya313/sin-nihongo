import { describe, expect, it } from 'vitest';
import { jisLevelRadio } from './jisLevelRadio';

describe('jisLevelRadio schema', () => {
  it('default values equal undefined', () => {
    expect(jisLevelRadio.parse(undefined)).toBeUndefined();
  });

  it('none or 1 or 2 only accept', () => {
    expect(jisLevelRadio).toAcceptValues(['none', 1, 2]);
    expect(jisLevelRadio).not.toAcceptValue('abc');
  });
});
