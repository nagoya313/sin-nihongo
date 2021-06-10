import { plainToClass } from 'class-transformer';
import { PaginationQueryParams } from '../../app/params/PaginationQueryParams';

describe('PaginationQueryParams', () => {
  describe('currentPage', () => {
    it('pageがundefinedなら1を返すこと', () => {
      expect(plainToClass(PaginationQueryParams, {}).currentPage).toBe(1);
    });

    it('pageが真値ならその値を返すこと', () => {
      expect(plainToClass(PaginationQueryParams, { page: 5 }).currentPage).toBe(5);
    });
  });

  describe('skip', () => {
    it('飛ばすべき要素数を返すこと', () => {
      expect(plainToClass(PaginationQueryParams, { limit: 20, page: 1 }).skip).toBe(0);
      expect(plainToClass(PaginationQueryParams, { limit: 20, page: 5 }).skip).toBe(80);
    });
  });

  describe('take', () => {
    it('limitがundefinedなら20を返すこと', () => {
      expect(plainToClass(PaginationQueryParams, {}).take).toBe(20);
    });

    it('limitが真値ならその値を返すこと', () => {
      expect(plainToClass(PaginationQueryParams, { limit: 5 }).take).toBe(5);
    });
  });

  describe('pageParams', () => {
    it('skipとtakeの組を返すこと', () => {
      expect(plainToClass(PaginationQueryParams, { limit: 20, page: 1 }).pageParams).toStrictEqual({
        skip: 0,
        take: 20,
      });
    });
  });
});
