import { flatten, uniqBy } from 'lodash';
import { type GetterType, type Glyph } from '../types';
import Strokes from './Strokes';

export default class GlyphLoader<TGlyph extends Glyph> {
  constructor(getter: GetterType<TGlyph>) {
    this.#getter = getter;
  }

  async includeGlyphs(glyph: TGlyph) {
    const linkStrokes = new Strokes(glyph).linkStrokes;
    const glyphs = [];
    // 直列にしないとコネクションプールが盡きる
    for (const stroke of linkStrokes) {
      glyphs.push(await this.#getter(stroke.linkStrokeId!));
    }
    return glyphs;
    // return Promise.all(linkStrokes.map(async (stroke) => await this.#getter(stroke.linkStrokeId!)));
  }

  async drawNecessaryGlyphs(data: TGlyph) {
    return uniqBy(await this.#scanRecursion(data), 'name');
  }

  async #scanRecursion(data: TGlyph): Promise<ReadonlyArray<TGlyph>> {
    const linkStrokes = new Strokes(data).linkStrokes;
    const strokes = [];
    // 直列にしないとコネクションプールが盡きる
    for (const stroke of linkStrokes) {
      const base = await this.#getter(stroke.linkStrokeId);
      if (base.data == null) {
        strokes.push([base]);
      } else {
        strokes.push([base].concat(await this.#scanRecursion(base)));
      }
    }
    /* const strokes = await Promise.all(
      linkStrokes.map(async (stroke) => {
        const base = await this.#getter(stroke.linkStrokeId);
        if (base.data == null) return [base];
        return [base].concat(await this.#scanRecursion(base));
      }),
    ); */
    return flatten(strokes);
  }

  #getter: GetterType<TGlyph>;
}
