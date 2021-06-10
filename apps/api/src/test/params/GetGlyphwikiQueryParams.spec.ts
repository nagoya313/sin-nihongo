import { plainToClass } from 'class-transformer';
import { GetGlyphwikiQueryParams } from '../../app/params/GetGlyphwikiQueryParams';

describe('GetGlyphwikiQueryParams', () => {
  describe('name', () => {
    it('qが一文字の場合はcode pointに変換すること', () => {
      expect(plainToClass(GetGlyphwikiQueryParams, { q: 'a' }).name).toBe('u0061');
      expect(plainToClass(GetGlyphwikiQueryParams, { q: '一' }).name).toBe('u4e00');
      // サロゲートペア
      expect(plainToClass(GetGlyphwikiQueryParams, { q: '𠀋' }).name).toBe('u2000b');
    });

    it('qが二文字以上の場合はそのままを返すこと', () => {
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
        expect(plainToClass(GetGlyphwikiQueryParams, { q: q }).name).toBe(q);
      });
    });
  });
});
