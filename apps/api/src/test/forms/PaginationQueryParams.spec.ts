import { validate } from 'class-validator';
import { PaginationQueryParams } from '../../app/libs/pagination';
import { itBehavesLike } from '../shared_examples/index';

describe('PaginationQueryParams', () => {
  describe('validation', () => {
    describe('page', () => {
      itBehavesLike('isOptionalParams', { target: new PaginationQueryParams(), param: 'page' });

      it('pageとして1以上の数字は受附けること', async (done) => {
        const accepts = [1, 5, 11];

        await Promise.all(
          accepts.map(async (q) => {
            const params = new PaginationQueryParams();
            params.page = q;
            const errors = await validate(params);
            expect(errors.length).toBe(0);
          })
        );

        done();
      });

      it('pageとして0は受附けないこと', async (done) => {
        const params = new PaginationQueryParams();
        params.page = 0;
        const errors = await validate(params);
        expect(errors.length).not.toBe(0);

        done();
      });

      it('pageとして整数以外は受附けないこと', async (done) => {
        const accepts = [1.2, 2.7];

        await Promise.all(
          accepts.map(async (q) => {
            const params = new PaginationQueryParams();
            params.page = q;
            const errors = await validate(params);
            expect(errors.length).not.toBe(0);
          })
        );

        done();
      });
    });
  });
});
