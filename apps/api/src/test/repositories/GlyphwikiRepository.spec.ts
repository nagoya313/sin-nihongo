jest.mock('axios');
import axios from 'axios';
import { NotFoundError } from 'routing-controllers';
import { GlyphwikiRepository } from '../../app/repositories/GlyphwikiRepository';

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GlyphwikiRepository', () => {
  describe('findByNameOrFail', () => {
    it('エラーがない時は結果が取れること', async (done) => {
      mockedAxios.get.mockImplementation(async () => ({
        data: { name: 'u4e00', data: '1:0:0:14:101:186:101' },
      }));

      expect(await GlyphwikiRepository.findByNameOrFail('u4e00')).toStrictEqual({
        data: { name: 'u4e00', data: '1:0:0:14:101:186:101' },
        includeGlyphs: [],
      });

      done();
    });

    it('エラーの時はNotFoundErrorを投げること', async (done) => {
      mockedAxios.get.mockImplementation(async () => ({
        data: { data: '1:0:0:14:101:186:101' },
      }));

      const findPromise = GlyphwikiRepository.findByNameOrFail('u4e00');
      await expect(findPromise).rejects.toThrow(NotFoundError);

      done();
    });
  });
});
