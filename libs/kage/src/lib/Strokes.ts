import { uniqBy, filter, map } from 'lodash';
import { Columns } from './Columns';
import { Glyph } from './Glyph';

export class Strokes<G extends Glyph> {
  constructor(glyph: G) {
    this.strokes = glyph.data.split('$').map((stroke) => new Columns(stroke));
  }

  strokeOf(id: number) {
    return this.strokes[id];
  }

  get linkStrokes() {
    return uniqBy(filter(this.strokes, 'isLinkStroke'), 'linkStrokeId');
  }

  get linkIds() {
    return map(this.linkStrokes, 'linkStrokeId');
  }

  get data() {
    return map(this.strokes, 'data').join('$');
  }

  get numberOfStrokes() {
    return this.strokes.length;
  }

  private readonly strokes: Columns[];
}
