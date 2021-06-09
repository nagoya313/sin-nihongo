import { KageColumns } from '../../../app/libs/kage/KageColumns';

describe('KageColumns', () => {
  it('直線の画が正しく解析できること', () => {
    const stroke = new KageColumns('1:0:0:14:101:186:101');
    expect(stroke.data).toBe('1:0:0:14:101:186:101');
    expect(stroke.isLinkStroke).toBeFalse();
    expect(stroke.linkStrokeId).toBeUndefined();
  });

  it('参照を持つ画が正しく解析できること', () => {
    const stroke = new KageColumns('99:0:0:10:5:190:105:u4e03-j');
    expect(stroke.data).toBe('99:0:0:10:5:190:105:u4e03-j');
    expect(stroke.isLinkStroke).toBeTrue();
    expect(stroke.linkStrokeId).toBe('u4e03-j');
  });
});
