import filter from 'lodash/filter';
import map from 'lodash/map';
import uniqBy from 'lodash/unionBy';
import Columns from './Columns';
import LinkColumns from './LinkColumns';
import { type Glyph } from './types';

export default class Strokes<TGlyph extends Pick<Glyph, 'data'>> {
  constructor(glyph: TGlyph) {
    this.#strokes = glyph.data?.split('$')?.map((stroke) => new Columns(stroke)) ?? [];
  }

  strokeOf(id: number) {
    return this.#strokes[id];
  }

  get linkStrokes() {
    return uniqBy(filter(this.#strokes, 'isLinkStroke'), 'linkStrokeId').map((stroke) => new LinkColumns(stroke.data));
  }

  get linkIds() {
    return map(this.linkStrokes, 'linkStrokeId');
  }

  get data() {
    return map(this.#strokes, 'data').join('$');
  }

  get numberOfStrokes() {
    return this.#strokes.length;
  }

  readonly #strokes: ReadonlyArray<Columns>;
}
