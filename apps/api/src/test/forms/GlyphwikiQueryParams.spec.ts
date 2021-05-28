import { validate } from 'class-validator';
import { GlyphwikiQueryParams } from '../../app/forms/GlyphwikiForm';

describe('GlyphwikiQueryParams', () => {
  describe('validation', () => {
    it('qとして一文字は受け付けること', async (done) => {
      const accepts = ['a', '一', 'あ', 'Ａ'];

      await Promise.all(
        accepts.map(async (q) => {
          const params = new GlyphwikiQueryParams();
          params.q = q;
          const errors = await validate(params);
          expect(errors.length).toBe(0);
        })
      );

      done();
    });

    it('qとして半角英数字と_-@以外を含む二文字以上は受け付けないこと', async (done) => {
      const accepts = ['aＡ', '一二', 'あa', '*1', '一2三'];

      await Promise.all(
        accepts.map(async (q) => {
          const params = new GlyphwikiQueryParams();
          params.q = q;
          const errors = await validate(params);
          expect(errors.length).not.toBe(0);
        })
      );

      done();
    });

    it('qとして半角英数字と-@のみを含む二文字以上は受け付けること', async (done) => {
      const accepts = [
        'u4e00',
        'bsp_a0001',
        'u4e00-j',
        'koseki-906890',
        'u58f9-01',
        'u58f9-01-var-001',
        'u2ff1-cdpo-81e4-u571f',
        'u9996-j@5',
      ];

      await Promise.all(
        accepts.map(async (q) => {
          const params = new GlyphwikiQueryParams();
          params.q = q;
          const errors = await validate(params);
          expect(errors.length).toBe(0);
        })
      );

      done();
    });
  });

  describe('glyphwikiApiRequestParam', () => {
    it('一文字の場合はcode pointに変換すること', () => {
      const params = new GlyphwikiQueryParams();
      params.q = 'a';
      expect(params.glyphwikiApiRequestParam).toBe('u0061');
      params.q = '一';
      expect(params.glyphwikiApiRequestParam).toBe('u4e00');
      params.q = '𠀋';
      expect(params.glyphwikiApiRequestParam).toBe('u2000b');
    });

    it('二文字以上の場合はそのままを返すこと', () => {
      [
        'u4e00',
        'bsp_a0001',
        'u4e00-j',
        'koseki-906890',
        'u58f9-01',
        'u58f9-01-var-001',
        'u2ff1-cdpo-81e4-u571f',
        'u9996-j@5',
      ].forEach((q) => {
        const params = new GlyphwikiQueryParams();
        params.q = q;
        expect(params.glyphwikiApiRequestParam).toBe(q);
      });
    });
  });
});
