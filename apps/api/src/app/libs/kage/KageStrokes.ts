import { uniq, filter, pluck } from 'underscore';
import { KageColumns } from './KageColumns';

export class KageStrokes {
  constructor(data: string) {
    this.strokes = data.split('$').map((stroke) => new KageColumns(stroke));
  }

  strokeOf(id: number) {
    return this.strokes[id];
  }

  get linkStrokes() {
    return uniq(
      filter(this.strokes, (stroke) => stroke.isLinkStroke),
      'linkStrokeId'
    );
  }

  get linkIds() {
    return pluck(this.linkStrokes, 'linkStrokeId');
  }

  get data() {
    return pluck(this.strokes, 'data').join('$');
  }

  get numberOfStrokes() {
    return this.strokes.length;
  }

  private readonly strokes: KageColumns[];
}
