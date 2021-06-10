import { KageColumns } from '../../../app/libs/kage/KageColumns';
import * as testData from '../testData';

describe('KageColumns', () => {
  it('直線の画が正しく解析できること', () => {
    const stroke = new KageColumns(testData.simpleKageStroke);
    expect(stroke.data).toBe(testData.simpleKageStroke);
    expect(stroke.isLinkStroke).toBeFalse();
    expect(stroke.linkStrokeId).toBeUndefined();
  });

  it('参照を持つ画が正しく解析できること', () => {
    const stroke = new KageColumns(testData.hasGlyphKageStroke);
    expect(stroke.data).toBe(testData.hasGlyphKageStroke);
    expect(stroke.isLinkStroke).toBeTrue();
    expect(stroke.linkStrokeId).toBe(testData.hasGlyphId);
  });
});
