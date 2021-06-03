import { PaginationQueryParams } from '../../app/libs/pagination';

describe('PaginationQueryParams', () => {
  describe('validation', () => {
    const subject = new PaginationQueryParams();

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
