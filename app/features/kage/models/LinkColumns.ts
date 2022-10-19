import Columns from './Columns';

export default class LinkColumns extends Columns {
  override get linkStrokeId() {
    return super.linkStrokeId!;
  }
}
