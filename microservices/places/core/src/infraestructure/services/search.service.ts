import { GoogleAddress, GoogleDetailsResult } from "../dtos";
import { GoogleApi } from "../http";

export class SearchService {
  private api: GoogleApi;

  constructor() {
    this.api = new GoogleApi();
  }

  async search(country: string, address: string): Promise<GoogleAddress[]> {
    const addresses = await this.api.search(country, address);
    const geometries: GoogleDetailsResult[] = await Promise.all(
      addresses.predictions.map(async (p) => {
        return await this.api.details(p.place_id);
      })
    );

    const data: GoogleAddress[] = [];

    addresses.predictions.forEach((p) => {
      const latLng = geometries.find((g) => g.result.id === p.id);
      data.push({
        id: p.place_id,
        country,
        description: p.description,
        latLng: {
          lat: latLng?.result.geometry.location.lat || "",
          lng: latLng?.result.geometry.location.lng || "",
        },
      });
    });

    return data;
  }

  async geocode(lat: string, lng: string): Promise<GoogleAddress[]> {
    const addresses = await this.api.geocode(lat, lng);

    const data: GoogleAddress[] = [];

    addresses.results.forEach((a) => {
      data.push({
        id: a.place_id,
        country: "",
        description: a.formatted_address,
        latLng: {
          lat: a.geometry.location.lat,
          lng: a.geometry.location.lng,
        },
      });
    });

    return data;
  }
}
