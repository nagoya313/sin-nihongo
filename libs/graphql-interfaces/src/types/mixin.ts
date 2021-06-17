
type Constructor = abstract new (...args: any[]) => any;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  abstract class Hoge extends Base {
    timestamp = Date.now();
  };
  return Hoge
}
