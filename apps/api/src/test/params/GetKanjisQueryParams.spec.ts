import { plainToClass } from 'class-transformer';
import { GetKanjisQueryParams } from '../../app/params/GetKanjisQueryParams';

describe('GetKanjisQueryParams', () => {
  describe('ucsParams', () => {
    it('ucsがuxxxx形式の時数字に直されること', () => {
      expect(plainToClass(GetKanjisQueryParams, { ucs: 'u4e00' }).ucsParam).toBe(19968);
    });

    it('ucsが漢字一文字の時数字に直されること', () => {
      expect(plainToClass(GetKanjisQueryParams, { ucs: '一' }).ucsParam).toBe(19968);
    });

    it('ucsが空の時はundefinedなこと', () => {
      expect(plainToClass(GetKanjisQueryParams, {}).ucsParam).toBeUndefined();
    });
  });
});
