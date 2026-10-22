export interface PlacesResponse {
  features: {
    properties: {
      name: string;
      formatted: string;
      lat: number;
      lon: number;
      description?: string;
      artwork_type?: string;
    };
  }[];
}
