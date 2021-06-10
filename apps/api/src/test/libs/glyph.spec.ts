import { glyphData, includeGlyphData } from '../../app/libs/glyph';

describe('glyphData', () => {
  describe('取得函数が常に同じ時', () => {
    it('最初の取得函数の結果がグリフを含まない時の結果が正しいこと', async (done) => {
      const getter = async (key: string) => {
        return { name: key, data: '1:0:0:14:101:186:101' };
      };

      expect(await glyphData('u4e00', getter)).toStrictEqual({
        data: { name: 'u4e00', data: '1:0:0:14:101:186:101' },
        includeGlyphs: [],
      });

      done();
    });

    it('最初の取得函数の結果がグリフを1つ含む時の結果が正しいこと', async (done) => {
      const getter = async (key: string) => {
        switch (key) {
          case 'u4e00':
            return { name: key, data: '99:0:0:0:0:200:200:u4e00-j' };
          case 'u4e00-j':
            return { name: key, data: '1:0:0:14:101:186:101' };
        }
      };

      expect(await glyphData('u4e00', getter)).toStrictEqual({
        data: { name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j' },
        includeGlyphs: [{ name: 'u4e00-j', data: '1:0:0:14:101:186:101' }],
      });

      done();
    });

    it('最初の取得函数の結果がグリフを2つ含む時の結果が正しいこと', async (done) => {
      const getter = async (key: string) => {
        switch (key) {
          case 'u4e00':
            return { name: key, data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-g' };
          case 'u4e00-j':
            return { name: key, data: '1:0:0:14:101:186:101' };
          case 'u4e00-g':
            return { name: key, data: '1:0:0:14:101:186:101' };
        }
      };

      const data = await glyphData('u4e00', getter);

      expect(data.data).toStrictEqual({ name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-g' });
      expect(data.includeGlyphs).toIncludeAllMembers([
        { name: 'u4e00-j', data: '1:0:0:14:101:186:101' },
        { name: 'u4e00-g', data: '1:0:0:14:101:186:101' },
      ]);

      done();
    });

    it('最初の取得函数の結果がグリフを含むグリフを含む時の結果が正しいこと', async (done) => {
      const getter = async (key: string) => {
        switch (key) {
          case 'u4e00':
            return { name: key, data: '99:0:0:0:0:200:200:u4e00-j' };
          case 'u4e00-j':
            return { name: key, data: '99:0:0:0:0:200:200:u4e00-g' };
          case 'u4e00-g':
            return { name: key, data: '1:0:0:14:101:186:101' };
        }
      };

      const data = await glyphData('u4e00', getter);

      expect(data.data).toStrictEqual({ name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j' });
      expect(data.includeGlyphs).toIncludeAllMembers([
        { name: 'u4e00-j', data: '99:0:0:0:0:200:200:u4e00-g' },
        { name: 'u4e00-g', data: '1:0:0:14:101:186:101' },
      ]);

      done();
    });

    it('最初の取得函数の結果が同じグリフを2つ含む時の結果が正しいこと', async (done) => {
      const getter = async (key: string) => {
        switch (key) {
          case 'u4e00':
            return { name: key, data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-j' };
          case 'u4e00-j':
            return { name: key, data: '1:0:0:14:101:186:101' };
          case 'u4e00-g':
            return { name: key, data: '1:0:0:14:101:186:101' };
        }
      };

      expect(await glyphData('u4e00', getter)).toStrictEqual({
        data: { name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-j' },
        includeGlyphs: [{ name: 'u4e00-j', data: '1:0:0:14:101:186:101' }],
      });

      done();
    });
  });

  describe('最初の取得函数が違ふ時', () => {
    it('最初の取得函数の結果がグリフを含まない時の結果が正しいこと', async (done) => {
      const firstgetter = async (key: string) => {
        return { name: key, data: '1:0:0:14:101:186:101' };
      };
      const getter = async (key: string) => {
        return { name: key, data: '1:0:0:14:101:186:101' };
      };

      expect(await glyphData('u4e00', getter, firstgetter)).toStrictEqual({
        data: { name: 'u4e00', data: '1:0:0:14:101:186:101' },
        includeGlyphs: [],
      });

      done();
    });

    it('最初の取得函数の結果がグリフを1つ含む時の結果が正しいこと', async (done) => {
      const firstgetter = async (key: string) => {
        return { name: key, data: '99:0:0:0:0:200:200:u4e00-j' };
      };
      const getter = async (key: string) => {
        return { name: key, data: '1:0:0:14:101:186:101' };
      };

      expect(await glyphData('u4e00', getter, firstgetter)).toStrictEqual({
        data: { name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j' },
        includeGlyphs: [{ name: 'u4e00-j', data: '1:0:0:14:101:186:101' }],
      });

      done();
    });

    it('最初の取得函数の結果がグリフを2つ含む時の結果が正しいこと', async (done) => {
      const firstgetter = async (key: string) => {
        return { name: key, data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-g' };
      };
      const getter = async (key: string) => {
        switch (key) {
          case 'u4e00-j':
            return { name: key, data: '1:0:0:14:101:186:101' };
          case 'u4e00-g':
            return { name: key, data: '1:0:0:14:101:186:101' };
        }
      };

      const data = await glyphData('u4e00', getter, firstgetter);

      expect(data.data).toStrictEqual({ name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-g' });
      expect(data.includeGlyphs).toIncludeAllMembers([
        { name: 'u4e00-j', data: '1:0:0:14:101:186:101' },
        { name: 'u4e00-g', data: '1:0:0:14:101:186:101' },
      ]);

      done();
    });

    it('最初の取得函数の結果がグリフを含むグリフを含む時の結果が正しいこと', async (done) => {
      const firstgetter = async (key: string) => {
        return { name: key, data: '99:0:0:0:0:200:200:u4e00-j' };
      };
      const getter = async (key: string) => {
        switch (key) {
          case 'u4e00-j':
            return { name: key, data: '99:0:0:0:0:200:200:u4e00-g' };
          case 'u4e00-g':
            return { name: key, data: '1:0:0:14:101:186:101' };
        }
      };

      const data = await glyphData('u4e00', getter, firstgetter);

      expect(data.data).toStrictEqual({ name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j' });
      expect(data.includeGlyphs).toIncludeAllMembers([
        { name: 'u4e00-j', data: '99:0:0:0:0:200:200:u4e00-g' },
        { name: 'u4e00-g', data: '1:0:0:14:101:186:101' },
      ]);

      done();
    });

    it('最初の取得函数の結果が同じグリフを2つ含む時の結果が正しいこと', async (done) => {
      const firstgetter = async (key: string) => {
        return { name: key, data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-j' };
      };
      const getter = async (key: string) => {
        switch (key) {
          case 'u4e00':
            return { name: key, data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-j' };
          case 'u4e00-j':
            return { name: key, data: '1:0:0:14:101:186:101' };
          case 'u4e00-g':
            return { name: key, data: '1:0:0:14:101:186:101' };
        }
      };

      expect(await glyphData('u4e00', getter, firstgetter)).toStrictEqual({
        data: { name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-j' },
        includeGlyphs: [{ name: 'u4e00-j', data: '1:0:0:14:101:186:101' }],
      });

      done();
    });
  });
});

describe('includeGlyphData', () => {
  it('グリフを含まないデータの時の結果が正しいこと', async (done) => {
    const getter = async (key: string) => {
      return { name: key, data: '1:0:0:14:101:186:101' };
    };

    expect(await includeGlyphData({ name: 'u4e00', data: '1:0:0:14:101:186:101' }, getter)).toStrictEqual([]);

    done();
  });

  it('グリフを1つ含むデータの時の結果が正しいこと', async (done) => {
    const getter = async (key: string) => {
      switch (key) {
        case 'u4e00':
          return { name: key, data: '99:0:0:0:0:200:200:u4e00-j' };
        case 'u4e00-j':
          return { name: key, data: '1:0:0:14:101:186:101' };
      }
    };

    expect(await includeGlyphData({ name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j' }, getter)).toStrictEqual([
      { name: 'u4e00-j', data: '1:0:0:14:101:186:101' },
    ]);

    done();
  });

  it('最初の取得函数の結果がグリフを2つ含む時の結果が正しいこと', async (done) => {
    const getter = async (key: string) => {
      switch (key) {
        case 'u4e00':
          return { name: key, data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-g' };
        case 'u4e00-j':
          return { name: key, data: '1:0:0:14:101:186:101' };
        case 'u4e00-g':
          return { name: key, data: '1:0:0:14:101:186:101' };
      }
    };

    const data = await includeGlyphData(
      { name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-g' },
      getter
    );

    expect(data).toIncludeAllMembers([
      { name: 'u4e00-j', data: '1:0:0:14:101:186:101' },
      { name: 'u4e00-g', data: '1:0:0:14:101:186:101' },
    ]);

    done();
  });

  it('最初の取得函数の結果がグリフを含むグリフを含む時の結果が正しいこと', async (done) => {
    const getter = async (key: string) => {
      switch (key) {
        case 'u4e00':
          return { name: key, data: '99:0:0:0:0:200:200:u4e00-j' };
        case 'u4e00-j':
          return { name: key, data: '99:0:0:0:0:200:200:u4e00-g' };
        case 'u4e00-g':
          return { name: key, data: '1:0:0:14:101:186:101' };
      }
    };

    const data = await includeGlyphData({ name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j' }, getter);

    expect(data).toIncludeAllMembers([
      { name: 'u4e00-j', data: '99:0:0:0:0:200:200:u4e00-g' },
      { name: 'u4e00-g', data: '1:0:0:14:101:186:101' },
    ]);

    done();
  });

  it('最初の取得函数の結果が同じグリフを2つ含む時の結果が正しいこと', async (done) => {
    const getter = async (key: string) => {
      switch (key) {
        case 'u4e00':
          return { name: key, data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-j' };
        case 'u4e00-j':
          return { name: key, data: '1:0:0:14:101:186:101' };
        case 'u4e00-g':
          return { name: key, data: '1:0:0:14:101:186:101' };
      }
    };

    expect(
      await includeGlyphData({ name: 'u4e00', data: '99:0:0:0:0:200:200:u4e00-j$99:0:0:0:0:200:200:u4e00-j' }, getter)
    ).toStrictEqual([{ name: 'u4e00-j', data: '1:0:0:14:101:186:101' }]);

    done();
  });
});
