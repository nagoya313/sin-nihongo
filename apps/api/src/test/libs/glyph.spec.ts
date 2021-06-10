import { glyphData, includeGlyphData } from '../../app/libs/glyph';
import * as testData from './testData';

describe('glyphData', () => {
  describe('取得函数が常に同じ時', () => {
    it('最初の取得函数の結果がグリフを含まない時の結果が正しいこと', async (done) => {
      expect(await glyphData(testData.simpleStrokeGlyphName, testData.testGetter)).toStrictEqual({
        data: { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
        includeGlyphs: [],
      });

      done();
    });

    it('最初の取得函数の結果がグリフを1つ含む時の結果が正しいこと', async (done) => {
      expect(await glyphData(testData.singleHasGlyphName, testData.testGetter)).toStrictEqual({
        data: { name: testData.singleHasGlyphName, data: testData.singleHasGlyphKageData },
        includeGlyphs: [{ name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData }],
      });

      done();
    });

    it('最初の取得函数の結果がグリフを2つ含む時の結果が正しいこと', async (done) => {
      const data = await glyphData(testData.multipleHasGlyphsOnlyGlyphName, testData.testGetter);

      expect(data.data).toStrictEqual({
        name: testData.multipleHasGlyphsOnlyGlyphName,
        data: testData.multipleHasGlyphsOnlyKageData,
      });
      expect(data.includeGlyphs).toIncludeAllMembers([
        { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
        { name: testData.simpleStrokeGlyphName2, data: testData.singleStrokeKageData2 },
      ]);

      done();
    });

    it('最初の取得函数の結果がグリフを含むグリフを含む時の結果が正しいこと', async (done) => {
      const data = await glyphData(testData.hasNestGlyphName, testData.testGetter);

      expect(data.data).toStrictEqual({ name: testData.hasNestGlyphName, data: testData.hasNestGlyphKageData });
      expect(data.includeGlyphs).toIncludeAllMembers([
        { name: testData.singleHasGlyphName, data: testData.singleHasGlyphKageData },
        { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
      ]);

      done();
    });

    it('最初の取得函数の結果が同じグリフを2つ含む時の結果が正しいこと', async (done) => {
      expect(await glyphData(testData.hasDuplicateGlyphName, testData.testGetter)).toStrictEqual({
        data: { name: testData.hasDuplicateGlyphName, data: testData.hasDuplicateGlyphsKageData },
        includeGlyphs: [{ name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData }],
      });

      done();
    });
  });

  describe('最初の取得函数が違ふ時', () => {
    it('最初の取得函数の結果がグリフを含まない時の結果が正しいこと', async (done) => {
      const firstgetter = async (key: string) => ({ name: key, data: testData.singleStrokeKageData });
      expect(await glyphData(testData.simpleStrokeGlyphName, testData.testGetter, firstgetter)).toStrictEqual({
        data: { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
        includeGlyphs: [],
      });

      done();
    });

    it('最初の取得函数の結果がグリフを1つ含む時の結果が正しいこと', async (done) => {
      const firstgetter = async (key: string) => ({ name: key, data: testData.singleHasGlyphKageData });
      expect(await glyphData(testData.singleHasGlyphName, testData.testGetter, firstgetter)).toStrictEqual({
        data: { name: testData.singleHasGlyphName, data: testData.singleHasGlyphKageData },
        includeGlyphs: [{ name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData }],
      });

      done();
    });

    it('最初の取得函数の結果がグリフを2つ含む時の結果が正しいこと', async (done) => {
      const firstgetter = async (key: string) => ({ name: key, data: testData.multipleHasGlyphsOnlyKageData });
      const data = await glyphData(testData.multipleHasGlyphsOnlyGlyphName, testData.testGetter, firstgetter);

      expect(data.data).toStrictEqual({
        name: testData.multipleHasGlyphsOnlyGlyphName,
        data: testData.multipleHasGlyphsOnlyKageData,
      });
      expect(data.includeGlyphs).toIncludeAllMembers([
        { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
        { name: testData.simpleStrokeGlyphName2, data: testData.singleStrokeKageData2 },
      ]);

      done();
    });

    it('最初の取得函数の結果がグリフを含むグリフを含む時の結果が正しいこと', async (done) => {
      const firstgetter = async (key: string) => ({ name: key, data: testData.hasNestGlyphKageData });
      const data = await glyphData(testData.hasNestGlyphName, testData.testGetter, firstgetter);

      expect(data.data).toStrictEqual({ name: testData.hasNestGlyphName, data: testData.hasNestGlyphKageData });
      expect(data.includeGlyphs).toIncludeAllMembers([
        { name: testData.singleHasGlyphName, data: testData.singleHasGlyphKageData },
        { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
      ]);

      done();
    });

    it('最初の取得函数の結果が同じグリフを2つ含む時の結果が正しいこと', async (done) => {
      const firstgetter = async (key: string) => ({ name: key, data: testData.hasDuplicateGlyphsKageData });
      expect(await glyphData(testData.hasDuplicateGlyphName, testData.testGetter, firstgetter)).toStrictEqual({
        data: { name: testData.hasDuplicateGlyphName, data: testData.hasDuplicateGlyphsKageData },
        includeGlyphs: [{ name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData }],
      });

      done();
    });
  });
});

describe('includeGlyphData', () => {
  it('グリフを含まないデータの時の結果が正しいこと', async (done) => {
    expect(
      await includeGlyphData(
        { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
        testData.testGetter
      )
    ).toStrictEqual([]);

    done();
  });

  it('グリフを1つ含むデータの時の結果が正しいこと', async (done) => {
    expect(
      await includeGlyphData(
        { name: testData.singleHasGlyphName, data: testData.singleHasGlyphKageData },
        testData.testGetter
      )
    ).toStrictEqual([{ name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData }]);

    done();
  });

  it('最初の取得函数の結果がグリフを2つ含む時の結果が正しいこと', async (done) => {
    const data = await includeGlyphData(
      {
        name: testData.multipleHasGlyphsOnlyGlyphName,
        data: testData.multipleHasGlyphsOnlyKageData,
      },
      testData.testGetter
    );

    expect(data).toIncludeAllMembers([
      { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
      { name: testData.simpleStrokeGlyphName2, data: testData.singleStrokeKageData2 },
    ]);

    done();
  });

  it('最初の取得函数の結果がグリフを含むグリフを含む時の結果が正しいこと', async (done) => {
    const data = await includeGlyphData(
      { name: testData.hasNestGlyphName, data: testData.hasNestGlyphKageData },
      testData.testGetter
    );

    expect(data).toIncludeAllMembers([
      { name: testData.singleHasGlyphName, data: testData.singleHasGlyphKageData },
      { name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData },
    ]);

    done();
  });

  it('最初の取得函数の結果が同じグリフを2つ含む時の結果が正しいこと', async (done) => {
    expect(
      await includeGlyphData(
        { name: testData.hasDuplicateGlyphName, data: testData.hasDuplicateGlyphsKageData },
        testData.testGetter
      )
    ).toStrictEqual([{ name: testData.simpleStrokeGlyphName, data: testData.singleStrokeKageData }]);

    done();
  });
});
