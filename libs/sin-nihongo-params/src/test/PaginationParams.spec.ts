import { PaginationParams } from '../../src/index';

describe('PaginationParams', () => {
  describe('validation', () => {
    const subject = PaginationParams;

    it('page', async (done) => {
      await Promise.all([
        expect(subject).isOptionalProperty('page'),
        expect(subject).isIntProperty('page'),
        expect(subject).minProperty('page', 1),
      ]);
      done();
    });

    it('limit', async (done) => {
      await Promise.all([
        expect(subject).isOptionalProperty('limit'),
        expect(subject).isIntProperty('limit'),
        expect(subject).minProperty('limit', 1),
        expect(subject).maxProperty('limit', 200),
      ]);
      done();
    });
  });
});
