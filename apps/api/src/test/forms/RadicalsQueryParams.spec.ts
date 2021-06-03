import { RadicalsQueryParams } from '../../app/forms/RadicalForm';

describe('RadicalsQueryParams', () => {
  describe('validation', () => {
    const subject = RadicalsQueryParams;
    it('nameLike', async (done) => {
      await Promise.all(
        [expect(subject).isOptionalProperty('nameLike')]
          .concat(
            // 表音的なひらがなのみは許可
            ['あ', 'あい', 'あー', 'あじの'].map((q) => expect(subject).allowValueProperty('nameLike', q))
          )
          .concat(
            // 非表音的なひらがなを含む場合は不許可
            ['ゐ', 'あぢ', 'あを', 'ゐゑを'].map((q) => expect(subject).not.allowValueProperty('nameLike', q))
          )
          .concat(
            // ひらがな以外を含む場合は不許可
            ['亜', 'あ亜', '亜あ', 'a', 'aあ', '亜a', 'あ伊う'].map((q) =>
              expect(subject).not.allowValueProperty('nameLike', q)
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

    it('numberOfStrokes', async (done) => {
      await Promise.all([
        expect(subject).isOptionalProperty('numberOfStrokes'),
        expect(subject).isIntProperty('numberOfStrokes'),
        expect(subject).minProperty('numberOfStrokes', 1),
      ]);
      done();
    });
  });
});
