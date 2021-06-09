import { GetKanjisParams } from '../../src/index';

describe('GetKanjisParams', () => {
  describe('validation', () => {
    const subject = GetKanjisParams;

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
});
