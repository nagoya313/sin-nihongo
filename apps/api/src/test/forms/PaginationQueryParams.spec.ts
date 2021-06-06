import { PaginationQueryParams } from '@sin-nihongo/api-interfaces';

describe('PaginationQueryParams', () => {
  describe('validation', () => {
    const subject = PaginationQueryParams;

    it('page', async (done) => {
      await Promise.all([
        expect(subject).isOptionalProperty('page'),
        expect(subject).isIntProperty('page'),
        expect(subject).minProperty('page', 1),
      ]);
      done();
    });
  });
});
