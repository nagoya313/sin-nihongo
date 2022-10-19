import { describe, expect, it } from 'vitest';
import Columns from './Columns';
import * as testData from './testData';

describe('Columns', () => {
  it('直線の画が正しく解析できること', () => {
    const stroke = new Columns(testData.simpleKageStroke);
    expect(stroke.data).toBe(testData.simpleKageStroke);
    expect(stroke.isLinkStroke).toBeFalse();
    expect(stroke.linkStrokeId).toBeUndefined();
  });

  it('参照を持つ画が正しく解析できること', () => {
    const stroke = new Columns(testData.hasGlyphKageStroke);
    expect(stroke.data).toBe(testData.hasGlyphKageStroke);
    expect(stroke.isLinkStroke).toBeTrue();
    expect(stroke.linkStrokeId).toBe(testData.hasGlyphId);
  });
});
