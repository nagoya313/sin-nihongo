export class Columns {
  constructor(stroke: string) {
    this.columns = stroke.split(':');
  }

  get isLinkStroke() {
    return this.columns[0] === '99' && typeof this.linkStrokeId !== 'undefined';
  }

  get linkStrokeId() {
    return this.columns[7];
  }

  get data() {
    return this.columns.join(':');
  }

  private readonly columns: string[];
}
