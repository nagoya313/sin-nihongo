import { GetKanjisQueryParams } from '../../app/params/GetKanjisQueryParams';

describe('GetKanjisQueryParams', () => {
  describe('ucsParams', () => {
    it('ucsがuxxxx形式の時数字に直されること', () => {
      const params = new GetKanjisQueryParams();
      params.ucs = 'u4e00';
      expect(params.ucsParam).toBe(19968);
    });

    it('ucsが漢字一文字の時数字に直されること', () => {
      const params = new GetKanjisQueryParams();
      params.ucs = '一';
      expect(params.ucsParam).toBe(19968);
    });

    it('ucsが空の時はundefinedなこと', () => {
      const params = new GetKanjisQueryParams();
      params.ucs = undefined;
      expect(params.ucsParam).toBeUndefined();
    });
  });
});
