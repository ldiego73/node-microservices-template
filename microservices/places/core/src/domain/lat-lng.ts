import { ValueObject } from "@micro/kernel/lib/domain/value-object";

export interface LatLngProps {
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

  constructor(props: LatLngProps) {
    super(props);
  }
}
