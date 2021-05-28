import { KageColumns } from './kage/KageColumns';
import { KageStrokes } from './kage/KageStrokes';
import { GlyphwikiData } from './glyphwiki';

export { KageColumns, KageStrokes };
export const glyphwikiDataToKageStrokes = (data: GlyphwikiData) => new KageStrokes(data.data);
