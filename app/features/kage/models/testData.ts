// コード補完上でデータが見えるやうにあへてDRYに展開しない
export const simpleStrokeGlyphName = 'simpleGlyph';
export const simpleKageStroke = '1:0:0:14:101:186:101';
export const singleStrokeKageData = '1:0:0:14:101:186:101';

export const simpleStrokeGlyphName2 = 'simpleGlyph2';
export const singleStrokeKageData2 = '1:0:0:14:101:186:101';

export const multipleKageStroke1 = '1:0:32:100:18:100:165';
export const multipleKageStroke2 = '1:0:13:34:58:34:165';
export const multipleKageStroke3 = '1:2:2:34:165:166:165';
export const multipleKageStroke4 = '1:0:23:166:58:166:165';
export const multipleStrokesKageData =
  '1:0:32:100:18:100:165$1:0:13:34:58:34:165$1:2:2:34:165:166:165$1:0:23:166:58:166:165';

export const singleHasGlyphName = 'singleHasGlyph';
export const hasGlyphId = 'simpleGlyph';
export const hasGlyphKageStroke = '99:0:0:10:5:190:105:simpleGlyph';
export const singleHasGlyphKageData = '99:0:0:10:5:190:105:simpleGlyph';

export const multipleHasGlyphsOnlyGlyphName = 'multipleHasGlyphsOnlyGlyph';
export const multipleHasGlyphsOnlyGlyphId1 = 'simpleGlyph';
export const multipleHasGlyphsOnlyGlyphId2 = 'simpleGlyph2';
export const multipleHasGlyphsOnlyKageStroke1 = '99:0:0:0:0:165:200:simpleGlyph';
export const multipleHasGlyphsOnlyKageStroke2 = '99:0:0:5:0:200:200:simpleGlyph2';
export const multipleHasGlyphsOnlyKageData = '99:0:0:0:0:165:200:simpleGlyph$99:0:0:5:0:200:200:simpleGlyph2';

export const hasGlyphAndMultipleStrokesGlyphName = 'hasGlyphAndMultipleStrokesGlyph';
export const hasGlyphAndMultipleStrokesGlyphId = 'simpleGlyph';
export const hasGlyphAndMultipleStrokesKageStroke1 = '99:0:0:1:2:166:200:simpleGlyph';
export const hasGlyphAndMultipleStrokesKageStroke2 = '1:0:0:75:58:173:58';
export const hasGlyphAndMultipleStrokesKageStroke3 = '1:0:0:62:165:185:165';
export const hasGlyphAndMultipleStrokesKageData =
  '99:0:0:1:2:166:200:simpleGlyph$1:0:0:75:58:173:58$1:0:0:62:165:185:165';

export const hasDuplicateGlyphName = 'hasDuplicateGlyph';
export const hasDuplicateGlyphId = 'simpleGlyph';
export const hasDuplicateGlyphsKageStroke1 = '99:0:0:10:5:190:105:simpleGlyph';
export const hasDuplicateGlyphsKageStroke2 = '99:0:0:5:92:113:192:simpleGlyph';
export const hasDuplicateGlyphsKageStroke3 = '99:0:0:75:92:195:192:simpleGlyph';
export const hasDuplicateGlyphsKageData =
  '99:0:0:10:5:190:105:simpleGlyph$99:0:0:5:92:113:192:simpleGlyph$99:0:0:75:92:195:192:simpleGlyph';

export const hasNestGlyphName = 'hasNestGlyph';
export const hasNestGlyphKageData = '99:0:0:10:5:190:105:singleHasGlyph';

export const testGetter = async (key: string): Promise<{ name: string; data: string }> => {
  switch (key) {
    case simpleStrokeGlyphName:
      return { name: key, data: singleStrokeKageData };
    case simpleStrokeGlyphName2:
      return { name: key, data: singleStrokeKageData2 };
    case singleHasGlyphName:
      return { name: key, data: singleHasGlyphKageData };
    case multipleHasGlyphsOnlyGlyphName:
      return { name: key, data: multipleHasGlyphsOnlyKageData };
    case hasGlyphAndMultipleStrokesGlyphName:
      return { name: key, data: hasGlyphAndMultipleStrokesKageData };
    case hasDuplicateGlyphName:
      return { name: key, data: hasDuplicateGlyphsKageData };
    case hasNestGlyphName:
      return { name: key, data: hasNestGlyphKageData };
    default:
      throw Error;
  }
};
