import { KageStrokes } from '../../../app/libs/kage';

describe('KageStrokes', () => {
  it('一（一画の参照なしの単純な字）が正しく解析できること', () => {
    const strokes = new KageStrokes('1:0:0:14:101:186:101');
    expect(strokes.data).toBe('1:0:0:14:101:186:101');
    expect(strokes.numberOfStrokes).toBe(1);
    expect(strokes.linkIds).toStrictEqual([]);
    expect(strokes.strokeOf(0).data).toBe('1:0:0:14:101:186:101');
  });

  it('山（複数画の参照なしの字）が正しく解析できること', () => {
    const strokes = new KageStrokes(
      '1:0:32:100:18:100:165$1:0:13:34:58:34:165$1:2:2:34:165:166:165$1:0:23:166:58:166:165'
    );
    expect(strokes.data).toBe('1:0:32:100:18:100:165$1:0:13:34:58:34:165$1:2:2:34:165:166:165$1:0:23:166:58:166:165');
    expect(strokes.numberOfStrokes).toBe(4);
    expect(strokes.linkIds).toStrictEqual([]);
    expect(strokes.strokeOf(0).data).toBe('1:0:32:100:18:100:165');
    expect(strokes.strokeOf(2).data).toBe('1:2:2:34:165:166:165');
  });

  it('睷（複数の参照のみで構成される字）が正しく解析できること', () => {
    const strokes = new KageStrokes('99:0:0:0:0:165:200:u76ee-01$99:0:0:5:0:200:200:u5efa-02');
    expect(strokes.data).toBe('99:0:0:0:0:165:200:u76ee-01$99:0:0:5:0:200:200:u5efa-02');
    expect(strokes.numberOfStrokes).toBe(2);
    expect(strokes.linkIds.length).toBe(2);
    expect(strokes.linkIds).toContain('u76ee-01');
    expect(strokes.linkIds).toContain('u5efa-02');
    expect(strokes.strokeOf(0).data).toBe('99:0:0:0:0:165:200:u76ee-01');
  });

  it('仁（参照を含む複数画の字）が正しく解析できること', () => {
    const strokes = new KageStrokes('99:0:0:1:2:166:200:u4ebb-01$0:0:0:0$1:0:0:75:58:173:58$1:0:0:62:165:185:165');
    expect(strokes.data).toBe('99:0:0:1:2:166:200:u4ebb-01$0:0:0:0$1:0:0:75:58:173:58$1:0:0:62:165:185:165');
    expect(strokes.numberOfStrokes).toBe(4);
    expect(strokes.linkIds.length).toBe(1);
    expect(strokes.linkIds).toContain('u4ebb-01');
    expect(strokes.strokeOf(0).data).toBe('99:0:0:1:2:166:200:u4ebb-01');
  });

  it('㐂（重複した複数の参照で構成される字）が正しく解析できること', () => {
    const strokes = new KageStrokes(
      '99:0:0:10:5:190:105:u4e03-j$99:0:0:5:92:113:192:u4e03-j$99:0:0:75:92:195:192:u4e03-j'
    );
    expect(strokes.data).toBe('99:0:0:10:5:190:105:u4e03-j$99:0:0:5:92:113:192:u4e03-j$99:0:0:75:92:195:192:u4e03-j');
    expect(strokes.linkIds).toContain('u4e03-j');
    expect(strokes.numberOfStrokes).toBe(3);
    expect(strokes.linkIds.length).toBe(1);
    expect(strokes.strokeOf(0).data).toBe('99:0:0:10:5:190:105:u4e03-j');
  });
});
