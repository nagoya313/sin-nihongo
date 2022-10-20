import flatten from 'lodash/flatten';
import uniqBy from 'lodash/uniqBy';
import { type GetterType, type Glyph } from '../types';
import Strokes from './Strokes';

export default class GlyphLoader<TGlyph extends Glyph> {
  constructor(getter: GetterType<TGlyph>) {
    this.#getter = getter;
  }

  async includeGlyphs(glyph: TGlyph) {
    const linkStrokes = new Strokes(glyph).linkStrokes;
    // 直列にしないとコネクションプールが盡きる
    const glyphs = [];
    for (const stroke of linkStrokes) {
      glyphs.push(await this.#getter(stroke.linkStrokeId!));
    }
    return glyphs;
  }

  async drawNecessaryGlyphs(data: TGlyph) {
    return uniqBy(await this.#scanRecursion(data), 'name');
  }

  async #scanRecursion(data: TGlyph): Promise<ReadonlyArray<TGlyph>> {
    const linkStrokes = new Strokes(data).linkStrokes;
    // 直列にしないとコネクションプールが盡きる
    const strokes = [];
    for (const stroke of linkStrokes) {
      const base = await this.#getter(stroke.linkStrokeId);
      if (base.data == null) {
        strokes.push([base]);
      } else {
        strokes.push([base].concat(await this.#scanRecursion(base)));
      }
    }
    return flatten(strokes);
  }

  #getter: GetterType<TGlyph>;
}
