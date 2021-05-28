import * as _ from 'underscore';
import { KageColumns } from './KageColumns';

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
