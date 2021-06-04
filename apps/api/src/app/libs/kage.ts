import { KageColumns } from './kage/KageColumns';
import { KageStrokes } from './kage/KageStrokes';
import { GlyphRecursionData } from './glyph';

export { KageColumns, KageStrokes };
export const glyphRecursionDataToKageStrokes = (data: GlyphRecursionData) => new KageStrokes(data.data);
