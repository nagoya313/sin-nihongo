import { KanjisQueryParams } from '@sin-nihongo/api-interfaces';

describe('KanjisQueryParams', () => {
  describe('validation', () => {
    const subject = KanjisQueryParams;

    it('ucs', async (done) => {
      await Promise.all([expect(subject).allowValueProperty('ucs', '一')]);
      await Promise.all([expect(subject).allowValueProperty('ucs', 'u4e00')]);
      await Promise.all([expect(subject).not.allowValueProperty('ucs', '㐂')]);
      await Promise.all([expect(subject).not.allowValueProperty('ucs', '𠀋')]);
      done();
    });

    it('readLike', async (done) => {
      await Promise.all(
        [expect(subject).isOptionalProperty('readLike')]
          .concat(
            // 表音的なひらがなのみは許可
            ['あ', 'あい', 'あー', 'あじの'].map((q) => expect(subject).allowValueProperty('readLike', q))
          )
          .concat(
            // 非表音的なひらがなを含む場合は不許可
            ['ゐ', 'あぢ', 'あを', 'ゐゑを'].map((q) => expect(subject).not.allowValueProperty('readLike', q))
          )
          .concat(
            // ひらがな以外を含む場合は不許可
            ['亜', 'あ亜', '亜あ', 'a', 'aあ', '亜a', 'あ伊う'].map((q) =>
              expect(subject).not.allowValueProperty('readLike', q)
            )
          )
      );
      done();
    });

    it('numberOfStrokes', async (done) => {
      await Promise.all([
        expect(subject).isOptionalProperty('numberOfStrokes'),
        expect(subject).isIntProperty('numberOfStrokes'),
        expect(subject).minProperty('numberOfStrokes', 1),
      ]);
      done();
    });

    it('jisLevel', async (done) => {
      await Promise.all([
        expect(subject).isOptionalProperty('jisLevel'),
        expect(subject).isIntProperty('jisLevel'),
        expect(subject).minProperty('jisLevel', 1),
        expect(subject).maxProperty('jisLevel', 2),
      ]);
      done();
    });

    it('regular', async (done) => {
      await Promise.all([expect(subject).isOptionalProperty('regular')]);
      done();
    });

    it('forName', async (done) => {
      await Promise.all([expect(subject).isOptionalProperty('forName')]);
      done();
    });

    it('radicalId', async (done) => {
      await Promise.all([
        expect(subject).isOptionalProperty('radicalId'),
        expect(subject).isIntProperty('radicalId'),
        expect(subject).minProperty('radicalId', 1),
      ]);
      done();
    });
  });

  describe('ucsParam', () => {
    it('漢字一文字の場合はundefinedを返すこと', () => {
      const params = new KanjisQueryParams();
      params.ucs = '一';
      expect(params.ucsParam).toBeUndefined();
    });

    it('uxxxxの時はcode pointの数値を返すこと', () => {
      const params = new KanjisQueryParams();
      params.ucs = 'u4e00';
      expect(params.ucsParam).toBe(19968);
    });
  });

  describe('kanjiParam', () => {
    it('漢字一文字の場合はcode pointの数字を返すこと', () => {
      const params = new KanjisQueryParams();
      params.ucs = '一';
      expect(params.kanjiParam).toBe(19968);
    });

    it('uxxxxの時はundefinedを返すこと', () => {
      const params = new KanjisQueryParams();
      params.ucs = 'u4e00';
      expect(params.kanjiParam).toBeUndefined();
    });
  });
});
