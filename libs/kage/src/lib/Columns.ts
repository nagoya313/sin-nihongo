export class Columns {
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

  readonly columns: string[];
}
