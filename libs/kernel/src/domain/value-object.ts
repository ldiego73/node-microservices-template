import equal from "fast-deep-equal";

interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    /* istanbul ignore next */
    if (vo.props === undefined) {
      return false;
    }
    return equal(this.props, vo.props);
  }
}
