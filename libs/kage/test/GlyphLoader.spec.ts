import { GlyphLoader } from '../src/lib/GlyphLoader';
import * as testData from './testData';

describe('GlyphLoader', () => {
  const describedClass = new GlyphLoader(testData.testGetter);

  describe('includeGlyphData', () => {
    it('グリフを含まないデータの時の結果が正しいこと', async (done) => {
      expect(
        await describedClass.includeGlyphs({
          name: testData.simpleStrokeGlyphName,
          data: testData.singleStrokeKageData,
        })
      ).toStrictEqual([]);

      done();
    });

    it('グリフを1つ含むデータの時の結果が正しいこと', async (done) => {
      expect(
        await describedClass.includeGlyphs({ name: testData.singleHasGlyphName, data: testData.singleHasGlyphKageData })
      ).toStrictEqual([{ name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData }]);

      done();
    });

    it('グリフを2つ含む時の結果が正しいこと', async (done) => {
      const data = await describedClass.includeGlyphs({
        name: testData.multipleHasGlyphsOnlyGlyphName,
        data: testData.multipleHasGlyphsOnlyKageData,
      });

      expect(data).toIncludeAllMembers([
        { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
        { name: testData.simpleStrokeGlyphName2, data: testData.singleStrokeKageData2 },
      ]);

      done();
    });

    it('グリフを含むグリフを含む時の結果が正しいこと', async (done) => {
      const data = await describedClass.includeGlyphs({
        name: testData.hasNestGlyphName,
        data: testData.hasNestGlyphKageData,
      });

      expect(data).toStrictEqual([{ name: testData.singleHasGlyphName, data: testData.singleHasGlyphKageData }]);

      done();
    });

    it('同じグリフを2つ含む時の結果が正しいこと', async (done) => {
      expect(
        await describedClass.includeGlyphs({
          name: testData.hasDuplicateGlyphName,
          data: testData.hasDuplicateGlyphsKageData,
        })
      ).toStrictEqual([{ name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData }]);

      done();
    });
  });

  describe('drawNecessaryGlyphs', () => {
    it('グリフを含まないデータの時の結果が正しいこと', async (done) => {
      expect(
        await describedClass.drawNecessaryGlyphs({
          name: testData.simpleStrokeGlyphName,
          data: testData.singleStrokeKageData,
        })
      ).toStrictEqual([]);

      done();
    });

    it('グリフを1つ含むデータの時の結果が正しいこと', async (done) => {
      expect(
        await describedClass.drawNecessaryGlyphs({
          name: testData.singleHasGlyphName,
          data: testData.singleHasGlyphKageData,
        })
      ).toStrictEqual([{ name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData }]);

      done();
    });

    it('グリフを2つ含む時の結果が正しいこと', async (done) => {
      const data = await describedClass.drawNecessaryGlyphs({
        name: testData.multipleHasGlyphsOnlyGlyphName,
        data: testData.multipleHasGlyphsOnlyKageData,
      });

      expect(data).toIncludeAllMembers([
        { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
        { name: testData.simpleStrokeGlyphName2, data: testData.singleStrokeKageData2 },
      ]);

      done();
    });

    it('グリフを含むグリフを含む時の結果が正しいこと', async (done) => {
      const data = await describedClass.drawNecessaryGlyphs({
        name: testData.hasNestGlyphName,
        data: testData.hasNestGlyphKageData,
      });

      expect(data).toIncludeAllMembers([
        { name: testData.singleHasGlyphName, data: testData.singleHasGlyphKageData },
        { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
      ]);

      done();
    });

    it('同じグリフを2つ含む時の結果が正しいこと', async (done) => {
      expect(
        await describedClass.drawNecessaryGlyphs({
          name: testData.hasDuplicateGlyphName,
          data: testData.hasDuplicateGlyphsKageData,
        })
      ).toStrictEqual([{ name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData }]);

      done();
    });
  });
});
