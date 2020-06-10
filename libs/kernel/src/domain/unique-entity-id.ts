import { v4 as uuid } from "uuid";

import { Identifier } from "./identifier";

export class UniqueEntityId extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ?? uuid());
  }
}
