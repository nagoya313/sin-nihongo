import { PaginationQueryParams } from '../../app/params/PaginationQueryParams';

describe('PaginationQueryParams', () => {
  describe('currentPage', () => {
    it('pageがundefinedなら1を返すこと', () => {
      const params = new PaginationQueryParams();
      expect(params.page).toBeUndefined();
      expect(params.currentPage).toBe(1);
    });

    it('pageが真値ならその値を返すこと', () => {
      const params = new PaginationQueryParams();
      params.page = 5;
      expect(params.currentPage).toBe(5);
    });
  });

  describe('skip', () => {
    it('飛ばすべき要素数を返すこと', () => {
      const params = new PaginationQueryParams();
      params.limit = 20;
      params.page = 1;
      expect(params.skip).toBe(0);
      params.page = 5;
      expect(params.skip).toBe(80);
    });
  });

  describe('take', () => {
    it('limitがundefinedなら20を返すこと', () => {
      const params = new PaginationQueryParams();
      expect(params.page).toBeUndefined();
      expect(params.take).toBe(20);
    });

    it('limitが真値ならその値を返すこと', () => {
      const params = new PaginationQueryParams();
      params.limit = 5;
      expect(params.take).toBe(5);
    });
  });

  describe('pageParams', () => {
    it('skipとtakeの組を返すこと', () => {
      const params = new PaginationQueryParams();
      params.page = 1;
      params.limit = 20;
      expect(params.pageParams).toStrictEqual({ skip: 0, take: 20 });
    });
  });
});
