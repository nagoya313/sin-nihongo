import { uniqBy, flatten } from 'lodash';
import { GetterType, Glyph } from './Glyph';
import { Strokes } from './Strokes';

export class GlyphLoader<G extends Glyph> {
  constructor(private getter: GetterType<G>) {}

  async includeGlyphs(glyph: G) {
    const linkStrokes = new Strokes(glyph).linkStrokes;
    return Promise.all(linkStrokes.map(async (stroke) => await this.getter(stroke.linkStrokeId)));
  }

  async drawNecessaryGlyphs(data: G) {
    return uniqBy(await this.scanRecursion(data), 'name');
  }

  private async scanRecursion(glyph: G) {
    const linkStrokes = new Strokes(glyph).linkStrokes;
    const strokes = await Promise.all(
      linkStrokes.map(async (stroke) => {
        const base = await this.getter(stroke.linkStrokeId);
        return this.recursionData(base);
      })
    );
    return flatten(strokes);
  }

  private async recursionData(glyph: G): Promise<G[]> {
    const scan = await this.scanRecursion(glyph);
    return [glyph].concat(scan);
  }
}
