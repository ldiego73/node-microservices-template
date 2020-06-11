export interface GooglePredictions {
  id: string;
  place_id: string;
  description: string;
}

export interface GoogleSearchResult {
  predictions: GooglePredictions[];
}

export interface GoogleLocation {
  lat: string;
  lng: string;
}

export interface GoogleGeometry {
  location: GoogleLocation;
}

export interface GoogleResult {
  id: string;
  place_id: string;
  formatted_address: string;
  geometry: GoogleGeometry;
}

export interface GoogleDetailsResult {
  result: GoogleResult;
}

export interface GoogleGeoCodeResult {
  results: GoogleResult[];
}

export interface GoogleAddress {
  id: string;
  country: string;
  description: string;
  latLng: GoogleLocation;
}
