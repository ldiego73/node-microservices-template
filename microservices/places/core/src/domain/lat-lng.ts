import { ValueObject } from "@micro/kernel/lib/domain/value-object";
import { Either,Result } from "@micro/kernel/lib/result";
import * as validator from "@micro/utils";

import { LatitudeInvalidError, LongitudeInvalidError } from "./errors";

interface LatLngProps {
  lat: string;
  lng: string;
}

export class LatLng extends ValueObject<LatLngProps> {
  public static LAT_PATTERN = /^[+-]?(([1-8]?[0-9])(\.[0-9]{1,13})?|90(\.0{1,13})?)$/;
  public static LNG_PATTERN = /^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(\.[0-9]{1,13})?)|180(\.0{1,13})?)$/;

  get lat(): string {
    return this.props.lat;
  }

  get lng(): string {
    return this.props.lng;
  }

  private constructor(props: LatLngProps) {
    super(props);
  }

  public static create(
    lat: string,
    lng: string
  ): Either<LatitudeInvalidError | LongitudeInvalidError, LatLng> {
    const validateLat = validator.pattern(this.LAT_PATTERN)(lat);
    const validateLng = validator.pattern(this.LNG_PATTERN)(lng);

    const errors: Either<
      LatitudeInvalidError | LongitudeInvalidError,
      LatLng
    >[] = [];

    if (!validateLat.success) {
      errors.push(Result.fail(LatitudeInvalidError.create(lat)));
    }

    if (!validateLng.success) {
      errors.push(Result.fail(LongitudeInvalidError.create(lng)));
    }

    if (errors.length > 0) {
      return Result.combine(errors);
    }

    return Result.ok(new LatLng({ lat, lng }));
  }
}
