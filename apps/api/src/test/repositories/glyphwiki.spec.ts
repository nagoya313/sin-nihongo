jest.mock('axios');
import axios from 'axios';
import { GlyphwikiQueryParams } from '@sin-nihongo/api-interfaces';
import { GlyphwikiRepository } from '../../app/repositories/GlyphwikiRepository';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(axios.get as any).mockImplementation(async (url: string, { params }) => {
  switch (params.name) {
    case 'u4e00': {
      return { data: { data: '99:0:0:0:0:200:200:u4e00-j', related: 'U+4E00', version: 18, name: 'u4e00' } };
    }
    case 'u4e00-j': {
      return {
        data: { version: 8, name: 'u4e00-j', data: '1:0:0:14:101:186:101', related: 'U+4E00' },
      };
    }
    case 'u7777': {
      return {
        data: {
          data: '99:0:0:0:0:165:200:u76ee-01$99:0:0:5:0:200:200:u5efa-02',
          related: 'U+7777',
          version: 14,
          name: 'u7777',
        },
      };
    }
    case 'u76ee-01': {
      return {
        data: { data: '99:0:0:7:11:85:174:u76ee-j', related: 'U+76EE', name: 'u76ee-01', version: 4 },
      };
    }
    case 'u76ee-j': {
      return {
        data: {
          data:
            '1:12:13:46:30:46:168$1:2:2:46:30:154:30$1:22:23:154:30:154:168$1:2:2:46:75:154:75$1:2:2:46:120:154:120$1:2:2:46:168:154:168',
          related: 'U+76EE',
          version: 2,
          name: 'u76ee-j',
        },
      };
    }
    case 'u5efa-02': {
      return {
        data: {
          data: '99:0:0:0:0:200:200:u5ef4-02:0:0:0$99:0:0:69:-10:217:191:u807f-06:0:0:0',
          related: 'U+5EFA',
          version: 1,
          name: 'u5efa-02',
        },
      };
    }
    case 'u5ef4-02': {
      return {
        data: {
          data:
            '1:0:2:63:30:92:30$1:22:13:92:30:75:85$1:2:2:75:85:100:85$2:22:7:100:85:89:161:50:186$2:7:0:69:103:84:183:177:176',
          version: 1,
          related: 'U+5EF4',
          name: 'u5ef4-02',
        },
      };
    }
    case 'u807f-06': {
      return {
        data: {
          related: 'U+807F',
          version: 1,
          name: 'u807f-06',
          data:
            '1:0:0:97:25:97:173$1:0:2:59:45:133:45$1:22:23:133:45:133:95$1:0:2:59:95:133:95$1:0:0:39:70:161:70$1:0:0:51:123:150:123$1:0:0:44:148:158:148',
        },
      };
    }
    case 'u3402-j': {
      return {
        data: {
          name: 'u3402-j',
          version: 3,
          data: '99:0:0:10:5:190:105:u4e03-j$99:0:0:5:92:113:192:u4e03-j$99:0:0:75:92:195:192:u4e03-j',
          related: 'U+3402',
        },
      };
    }
    case 'u4e03-j': {
      return {
        data: {
          version: 2,
          name: 'u4e03-j',
          data: '1:0:0:14:103:186:69$3:0:5:80:19:80:171:168:171',
          related: 'U+4E03',
        },
      };
    }
  }
  throw new Error('こゝにはこないはず');
});

const params = (code: string) => {
  const query = new GlyphwikiQueryParams();
  query.q = code;
  return query;
};

// テストが雑なので読込に問題があるデータを発見する毎にテストケースを足して行く方向で...
describe('GlyphwikiRepository.findOne', () => {
  it('参照なしの字を正しく取得できること', async (done) => {
    const response = await GlyphwikiRepository.findOne(params('u4e00-j'));
    expect(response.name).toBe('u4e00-j');
    expect(response.data).toBe('1:0:0:14:101:186:101');
    expect(response.includeGlyphs).toStrictEqual([]);
    done();
  });

  it('参照ありの字を正しく取得できること', async (done) => {
    const response = await GlyphwikiRepository.findOne(params('u4e00'));
    expect(response.name).toBe('u4e00');
    expect(response.data).toBe('99:0:0:0:0:200:200:u4e00-j');
    expect(response.includeGlyphs).toStrictEqual([{ name: 'u4e00-j', data: '1:0:0:14:101:186:101' }]);
    done();
  });

  it('参照のネストがある字を正しく取得できること', async (done) => {
    const response = await GlyphwikiRepository.findOne(params('u7777'));
    expect(response.name).toBe('u7777');
    expect(response.data).toBe('99:0:0:0:0:165:200:u76ee-01$99:0:0:5:0:200:200:u5efa-02');
    expect(response.includeGlyphs).toBeArrayOfSize(5);
    expect(response.includeGlyphs).toIncludeAllMembers([
      { name: 'u76ee-01', data: '99:0:0:7:11:85:174:u76ee-j' },
      {
        name: 'u76ee-j',
        data:
          '1:12:13:46:30:46:168$1:2:2:46:30:154:30$1:22:23:154:30:154:168$1:2:2:46:75:154:75$1:2:2:46:120:154:120$1:2:2:46:168:154:168',
      },
      { name: 'u5efa-02', data: '99:0:0:0:0:200:200:u5ef4-02:0:0:0$99:0:0:69:-10:217:191:u807f-06:0:0:0' },
      {
        name: 'u5ef4-02',
        data:
          '1:0:2:63:30:92:30$1:22:13:92:30:75:85$1:2:2:75:85:100:85$2:22:7:100:85:89:161:50:186$2:7:0:69:103:84:183:177:176',
      },
      {
        name: 'u807f-06',
        data:
          '1:0:0:97:25:97:173$1:0:2:59:45:133:45$1:22:23:133:45:133:95$1:0:2:59:95:133:95$1:0:0:39:70:161:70$1:0:0:51:123:150:123$1:0:0:44:148:158:148',
      },
    ]);
    done();
  });

  it('同じ参照を複数持つ字を正しく取得できること', async (done) => {
    const response = await GlyphwikiRepository.findOne(params('u3402-j'));
    expect(response.name).toBe('u3402-j');
    expect(response.data).toBe('99:0:0:10:5:190:105:u4e03-j$99:0:0:5:92:113:192:u4e03-j$99:0:0:75:92:195:192:u4e03-j');
    expect(response.includeGlyphs.length).toBe(1);
    expect(response.includeGlyphs).toIncludeAllMembers([
      {
        name: 'u4e03-j',
        data: '1:0:0:14:103:186:69$3:0:5:80:19:80:171:168:171',
      },
    ]);
    done();
  });
});
