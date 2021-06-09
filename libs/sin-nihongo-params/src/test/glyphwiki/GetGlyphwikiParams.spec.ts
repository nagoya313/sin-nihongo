import { GetGlyphwikiParams } from '../../lib/glyphwiki/GetGlyphwikiParams';

describe('GetGlyphwikiParams', () => {
  describe('validation', () => {
    const subject = GetGlyphwikiParams;
    it('q', async (done) => {
      await Promise.all(
        // 一文字は許可
        ['a', '一', 'あ', 'Ａ']
          .map((q) => expect(subject).allowValueProperty('q', q))
          .concat(
            // 半角英数字と_-@以外を含む二文字以上は不許可
            ['aＡ', '一二', 'あa', '*1', '一2三'].map((q) => expect(subject).not.allowValueProperty('q', q))
          )
          .concat(
            // 半角英数字と-@のみを含む二文字以上は許可
            [
              'u4e00',
              'bsp_a0001',
              'u4e00-j',
              'koseki-906890',
              'u58f9-01',
              'u58f9-01-var-001',
              'u2ff1-cdpo-81e4-u571f',
              'u9996-j@5',
            ]
              .map((q) => expect(subject).allowValueProperty('q', q))
              .concat(
                // 空文字、null、undefiendは不許可
                ['', null, undefined].map((q) => expect(subject).not.allowValueProperty('q', q))
              )
          )
      );

      done();
    });
  });
});
