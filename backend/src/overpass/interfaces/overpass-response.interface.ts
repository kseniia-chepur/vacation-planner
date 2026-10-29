export interface OverpassResponse {
  elements: {
    type: string;
    id: number;
    lat?: number;
    lon?: number;
    center?: {
      lat: number;
      lon: number;
    };
    tags?: {
      name?: string;
      description?: string;
      website?: string;
      wikidata?: string;
      phone?: string;
      opening_hours?: string;
      wheelchair?: string;
    };
  }[];
}
