import { flatten, uniqBy } from 'lodash';
import Strokes from './Strokes';
import { type GetterType, type Glyph } from './types';

export default class GlyphLoader<TGlyph extends Glyph> {
  constructor(getter: GetterType<TGlyph>) {
    this.#getter = getter;
  }

  async includeGlyphs(glyph: TGlyph) {
    const linkStrokes = new Strokes(glyph).linkStrokes;
    return Promise.all(linkStrokes.map(async (stroke) => await this.#getter(stroke.linkStrokeId!)));
  }

  async drawNecessaryGlyphs(data: TGlyph) {
    return uniqBy(await this.#scanRecursion(data), 'name');
  }

  async #scanRecursion(data: TGlyph): Promise<ReadonlyArray<TGlyph>> {
    const linkStrokes = new Strokes(data).linkStrokes;
    const strokes = await Promise.all(
      linkStrokes.map(async (stroke) => {
        const base = await this.#getter(stroke.linkStrokeId);
        if (base.data == null) return [base];
        return [base].concat(await this.#scanRecursion(base));
      }),
    );
    return flatten(strokes);
  }

  #getter: GetterType<TGlyph>;
}
