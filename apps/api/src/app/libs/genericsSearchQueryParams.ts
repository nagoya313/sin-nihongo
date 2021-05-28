import { IsOptional } from 'class-validator';
import { PaginationQueryParams } from '../libs/pagination';

export class GenericsSearchQueryParams extends PaginationQueryParams {
  @IsOptional()
  readonly q: string;

  get hasQuery() {
    return typeof this.q !== 'undefined';
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T extends GenericsSearchQueryParams = GenericsSearchQueryParams> = new (...args: any[]) => T;

export function integerableQueryParams<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    get integerQuery() {
      const data = parseInt(this.q);
      return isNaN(data) ? undefined : data;
    }

    get notIntegerQuery() {
      const data = parseInt(this.q);
      return isNaN(data) ? this.q : undefined;
    }
  };
}
