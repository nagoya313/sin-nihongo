jest.mock('axios');
import axios from 'axios';
import { NotFoundError } from 'routing-controllers';
import { Glyphwiki } from '../../app/services/Glyphwiki';

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Glyphwiki', () => {
  describe('.getData', () => {
    it('戻りデータが想定通りの時はnameとdataの組を返すこと', async (done) => {
      mockedAxios.get.mockImplementation(async () => ({
        data: { name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j' },
      }));
      expect(await Glyphwiki.getData('u4e00')).toStrictEqual({ name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j' });
      done();
    });

    it('戻りデータがにnameがない時はNotFoundErrorを投げること', async (done) => {
      mockedAxios.get.mockImplementation(async () => ({
        data: { data: '99:0:0:0:0:200:200:u4e00-j' },
      }));
      const getDataPromise = Glyphwiki.getData('u4e00');
      await expect(getDataPromise).rejects.toThrow(NotFoundError);
      done();
    });

    it('戻りデータがにdataがない時はNotFoundErrorを投げること', async (done) => {
      mockedAxios.get.mockImplementation(async () => ({
        data: { name: 'u4e00' },
      }));
      const getDataPromise = Glyphwiki.getData('u4e00');
      await expect(getDataPromise).rejects.toThrow(NotFoundError);
      done();
    });
  });

  describe('.health', () => {
    it('接続できた時はtrueを返すこと', async (done) => {
      mockedAxios.get.mockImplementation(async () => ({ data: {} }));
      expect(await Glyphwiki.health()).toBeTrue();
      done();
    });

    it('戻りが想定外の時はfalseを返すこと', async (done) => {
      mockedAxios.get.mockImplementation(async () => ({ data: { hoge: '' } }));
      expect(await Glyphwiki.health()).toBeFalse();
      done();
    });

    it('例外が発生した時はfalseを返すこと', async (done) => {
      mockedAxios.get.mockImplementation(async () => {
        throw Error;
      });
      expect(await Glyphwiki.health()).toBeFalse();
      done();
    });
  });
});
