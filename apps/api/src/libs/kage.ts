import * as _ from 'underscore';
import { GlyphwikiData } from './glyphwiki';

export class KageColumns {
  constructor(stroke: string) {
    this.columns = stroke.split(':');
  }

  get isLinkStroke() {
    return this.columns[0] === '99' && typeof this.columns[7] !== 'undefined';
  }

  get linkStrokeId() {
    return this.columns[7];
  }

  get data() {
    return this.columns.join(':');
  }

  readonly columns: (string | undefined)[];
}

export class KageStrokes {
  constructor(data: string) {
    this.strokes = data.split('$').map((stroke) => new KageColumns(stroke));
  }

  strokeOf(id: number) {
    return this.strokes[id];
  }

  get linkStrokes() {
    return _.uniq(
      _.filter(this.strokes, (stroke) => stroke.isLinkStroke),
      'linkStrokeId'
    );
  }

  get linkIds() {
    return _.pluck(this.linkStrokes, 'linkStrokeId');
  }

  get data() {
    return _.pluck(this.strokes, 'data').join('$');
  }

  get numberOfStrokes() {
    return this.strokes.length;
  }

  private readonly strokes: KageColumns[];
}

export const glyphwikiDataToKageStrokes = (data: GlyphwikiData) => new KageStrokes(data.data);
