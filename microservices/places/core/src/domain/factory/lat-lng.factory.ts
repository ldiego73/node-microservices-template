import { Either, Result } from "@micro/kernel/lib/result";
import * as validator from "@micro/utils";

import { LatitudeInvalidError, LongitudeInvalidError } from "../errors";
import { LatLng, LatLngProps } from "../lat-lng";

export class LatLngFactory {
  public static create(
    lat: string,
    lng: string
  ): Either<LatitudeInvalidError | LongitudeInvalidError, LatLng> {
    const validateLat = validator.pattern(LatLng.LAT_PATTERN)(lat);
    const validateLng = validator.pattern(LatLng.LNG_PATTERN)(lng);

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

  public static createFrom(lat: string, lng: string) {
    const props: LatLngProps = {
      lat,
      lng,
    };

    return new LatLng(props);
  }
}
