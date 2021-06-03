import { validate } from 'class-validator';
import { it, expect } from '@jest/globals';

const sharedSpecs = (args) => {
  const target = args.target;
  const param = target.param;

  it('値なしを受附けること', async (done) => {
    const errors = await validate(target);
    expect(errors).not.toEqual(expect.arrayContaining([expect.objectContaining({ property: param })]));

    done();
  });
};

module.exports = sharedSpecs;
