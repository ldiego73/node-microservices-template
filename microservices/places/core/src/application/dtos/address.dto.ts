export interface SearchDto {
  country: string;
  address: string;
}

export interface LocationDto {
  lat: string;
  lng: string;
}

export interface AddressDto {
  id: string;
  country: string;
  description: string;
  latLng: LocationDto;
}
