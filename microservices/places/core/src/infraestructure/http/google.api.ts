import { readEnv } from "@micro/places-config";
import axios from "axios";

import {
  GoogleDetailsResult,
  GoogleGeoCodeResult,
  GoogleSearchResult,
} from "../dtos";

const env = readEnv();
const API_URL = "https://maps.googleapis.com/maps/api";

export class GoogleApi {
  async search(country: string, address: string): Promise<GoogleSearchResult> {
    const url = `${API_URL}/place/autocomplete/json`;
    const queries: string[] = [];

    queries.push(`input=${address}`);
    queries.push(`types=address`);
    queries.push(`components=country:${country.toLowerCase()}`);
    queries.push(`key=${env.apiKey}`);

    const result = await axios.get(`${url}?${queries.join("&")}`);

    return result.data as GoogleSearchResult;
  }

  async details(placeId: string): Promise<GoogleDetailsResult> {
    const url = `${API_URL}/place/details/json`;
    const queries: string[] = [];

    queries.push(`place_id=${placeId}`);
    queries.push(`fields=name,id,geometry`);
    queries.push(`key=${env.apiKey}`);

    const result = await axios.get(`${url}?${queries.join("&")}`);

    return result.data as GoogleDetailsResult;
  }

  async geocode(lat: string, lng: string): Promise<GoogleGeoCodeResult> {
    const url = `${API_URL}/geocode/json`;
    const queries: string[] = [];

    queries.push(`latlng=${lat},${lng}`);
    queries.push(`result_type=street_address`);
    queries.push(`key=${env.apiKey}`);

    const result = await axios.get(`${url}?${queries.join("&")}`);

    return result.data as GoogleGeoCodeResult;
  }
}
