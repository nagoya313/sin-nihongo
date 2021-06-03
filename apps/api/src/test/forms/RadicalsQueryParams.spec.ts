import { validate } from 'class-validator';
import { RadicalsQueryParams } from '../../app/forms/RadicalForm';
import { itBehavesLike } from '../shared_examples/index';

describe('RadicalsQueryParams', () => {
  describe('validation', () => {
    describe('nameLike', () => {
      itBehavesLike('isOptionalParams', { target: new RadicalsQueryParams(), param: 'nameLike' });

      it('nameLikeとして表音的なひらがなのみの時は受附けること', async (done) => {
        const accepts = ['あ', 'あい', 'あー', 'あじの'];

        await Promise.all(
          accepts.map(async (q) => {
            const params = new RadicalsQueryParams();
            params.nameLike = q;
            const errors = await validate(params);
            expect(errors.length).toBe(0);
          })
        );

        done();
      });

      it('nameLikeとして表音的でないひらがなを含むと受附けないこと', async (done) => {
        const accepts = ['ゐ', 'あぢ', 'あを', 'ゐゑを'];

        await Promise.all(
          accepts.map(async (q) => {
            const params = new RadicalsQueryParams();
            params.nameLike = q;
            const errors = await validate(params);
            expect(errors.length).not.toBe(0);
          })
        );

        done();
      });

      it('nameLikeとしてひらがな以外を含むと受附けないこと', async (done) => {
        const accepts = ['亜', 'あ亜', '亜あ', 'a', 'aあ', '亜a', 'あ伊う'];

        await Promise.all(
          accepts.map(async (q) => {
            const params = new RadicalsQueryParams();
            params.nameLike = q;
            const errors = await validate(params);
            expect(errors.length).not.toBe(0);
          })
        );

        done();
      });
    });

    describe('numberOfStrokes', () => {
      itBehavesLike('isOptionalParams', { target: new RadicalsQueryParams(), param: 'numberOfStrokes' });

      it('numberOfStrokesとして1以上の数字は受附けること', async (done) => {
        const accepts = [1, 5, 11];

        await Promise.all(
          accepts.map(async (q) => {
            const params = new RadicalsQueryParams();
            params.numberOfStrokes = q;
            const errors = await validate(params);
            expect(errors.length).toBe(0);
          })
        );

        done();
      });

      it('numberOfStrokesとして0は受附けないこと', async (done) => {
        const params = new RadicalsQueryParams();
        params.numberOfStrokes = 0;
        const errors = await validate(params);
        expect(errors.length).not.toBe(0);

        done();
      });

      it('numberOfStrokesとして整数以外は受附けないこと', async (done) => {
        const accepts = [1.2, 2.7];

        await Promise.all(
          accepts.map(async (q) => {
            const params = new RadicalsQueryParams();
            params.numberOfStrokes = q;
            const errors = await validate(params);
            expect(errors.length).not.toBe(0);
          })
        );

        done();
      });
    });
  });
});
