import { flatten, uniqBy } from 'lodash';
import Strokes from './Strokes';
import { GetterType, Glyph } from './types';

export default class GlyphLoader<G extends Glyph> {
  constructor(getter: GetterType<G>) {
    this.#getter = getter;
  }

  async includeGlyphs(glyph: G) {
    const linkStrokes = new Strokes(glyph).linkStrokes;
    return Promise.all(linkStrokes.map(async (stroke) => await this.#getter(stroke.linkStrokeId!)));
  }

  async drawNecessaryGlyphs(data: G) {
    return uniqBy(await this.#scanRecursion(data), 'name');
  }

  async #scanRecursion(glyph: G) {
    const linkStrokes = new Strokes(glyph).linkStrokes;
    const strokes = await Promise.all(
      linkStrokes.map(async (stroke) => {
        const base = await this.#getter(stroke.linkStrokeId!);
        return this.#recursionData(base);
      }),
    );
    return flatten(strokes);
  }

  async #recursionData(glyph: G): Promise<G[]> {
    const scan = await this.#scanRecursion(glyph);
    return [glyph].concat(scan);
  }

  #getter: GetterType<G>;
}
