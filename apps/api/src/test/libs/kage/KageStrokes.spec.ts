import { KageStrokes } from '../../../app/libs/kage/KageStrokes';
import * as testData from '../testData';

describe('KageStrokes', () => {
  it('一画の参照なしの単純なデータが正しく解析できること', () => {
    const strokes = new KageStrokes(testData.singleStrokeKageData);
    expect(strokes.data).toBe(testData.singleStrokeKageData);
    expect(strokes.numberOfStrokes).toBe(1);
    expect(strokes.linkIds).toStrictEqual([]);
    expect(strokes.strokeOf(0).data).toBe(testData.singleStrokeKageData);
  });

  it('複数画の参照なしのデータが正しく解析できること', () => {
    const strokes = new KageStrokes(testData.multipleStrokesKageData);
    expect(strokes.data).toBe(testData.multipleStrokesKageData);
    expect(strokes.numberOfStrokes).toBe(4);
    expect(strokes.linkIds).toStrictEqual([]);
    expect(strokes.strokeOf(0).data).toBe(testData.multipleKageStroke1);
    expect(strokes.strokeOf(1).data).toBe(testData.multipleKageStroke2);
    expect(strokes.strokeOf(2).data).toBe(testData.multipleKageStroke3);
    expect(strokes.strokeOf(3).data).toBe(testData.multipleKageStroke4);
  });

  it('1つの参照のみのデータが正しく解析できること', () => {
    const strokes = new KageStrokes(testData.singleHasGlyphKageData);
    expect(strokes.data).toBe(testData.singleHasGlyphKageData);
    expect(strokes.numberOfStrokes).toBe(1);
    expect(strokes.linkIds).toStrictEqual([testData.hasGlyphId]);
    expect(strokes.strokeOf(0).data).toBe(testData.singleHasGlyphKageData);
  });

  it('複数の参照のみで構成されるデータが正しく解析できること', () => {
    const strokes = new KageStrokes(testData.multipleHasGlyphsOnlyKageData);
    expect(strokes.data).toBe(testData.multipleHasGlyphsOnlyKageData);
    expect(strokes.numberOfStrokes).toBe(2);
    expect(strokes.linkIds).toBeArrayOfSize(2);
    expect(strokes.linkIds).toIncludeAllMembers([
      testData.multipleHasGlyphsOnlyGlyphId1,
      testData.multipleHasGlyphsOnlyGlyphId2,
    ]);
    expect(strokes.strokeOf(0).data).toBe(testData.multipleHasGlyphsOnlyKageStroke1);
    expect(strokes.strokeOf(1).data).toBe(testData.multipleHasGlyphsOnlyKageStroke2);
  });

  it('参照を含む複数画のデータが正しく解析できること', () => {
    const strokes = new KageStrokes(testData.hasGlyphAndMultipleStrokesKageData);
    expect(strokes.data).toBe(testData.hasGlyphAndMultipleStrokesKageData);
    expect(strokes.numberOfStrokes).toBe(3);
    expect(strokes.linkIds).toBeArrayOfSize(1);
    expect(strokes.linkIds).toIncludeAllMembers([testData.hasGlyphAndMultipleStrokesGlyphId]);
    expect(strokes.strokeOf(0).data).toBe(testData.hasGlyphAndMultipleStrokesKageStroke1);
    expect(strokes.strokeOf(1).data).toBe(testData.hasGlyphAndMultipleStrokesKageStroke2);
    expect(strokes.strokeOf(2).data).toBe(testData.hasGlyphAndMultipleStrokesKageStroke3);
  });

  it('重複した複数の参照画で構成されるデータが正しく解析できること', () => {
    const strokes = new KageStrokes(testData.hasDuplicateGlyphsKageData);
    expect(strokes.data).toBe(testData.hasDuplicateGlyphsKageData);
    expect(strokes.linkIds).toContain(testData.hasDuplicateGlyphId);
    expect(strokes.numberOfStrokes).toBe(3);
    expect(strokes.linkIds).toBeArrayOfSize(1);
    expect(strokes.strokeOf(0).data).toBe(testData.hasDuplicateGlyphsKageStroke1);
    expect(strokes.strokeOf(1).data).toBe(testData.hasDuplicateGlyphsKageStroke2);
    expect(strokes.strokeOf(2).data).toBe(testData.hasDuplicateGlyphsKageStroke3);
  });
});
