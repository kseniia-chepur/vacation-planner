import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '../common/constants/error-messages.js';
import { GeocodingResponse } from './interfaces/geocoding-response.interface.js';
import { PlacesResponse } from './interfaces/places-response.interface.js';
import { handleExternalApiError } from '../common/utils/handle-external-api-error.js';

@Injectable()
export class GeoapifyService {
  private readonly baseUrl = 'https://api.geoapify.com';

  constructor(private readonly configService: ConfigService) {}

  private getApiKey(): string {
    const apiKey = this.configService.get<string>('GEOAPIFY_API_KEY');

    if (!apiKey) {
      throw new InternalServerErrorException(ERROR_MESSAGES.API_KEY_MISSING);
    }

    return apiKey;
  }

  async searchPlaces(destination: string) {
    const apiKey = this.getApiKey();

    const response = await fetch(
      `${this.baseUrl}/v1/geocode/search?text=${encodeURIComponent(
        destination,
      )}&format=json&apiKey=${apiKey}`,
    );

    handleExternalApiError(response);

    const data: GeocodingResponse = await response.json();

    if (!data.results.length) {
      throw new NotFoundException(ERROR_MESSAGES.DESTINATION_NOT_FOUND);
    }

    return this.getTouristAttractions(data.results[0].lat, data.results[0].lon);
  }

  async getTouristAttractions(lat: number, lon: number) {
    const apiKey = this.getApiKey();

    const response = await fetch(
      `${this.baseUrl}/v2/places?categories=tourism.attraction.viewpoint,entertainment,leisure.park&filter=circle:${lon},${lat},5000&limit=20&apiKey=${apiKey}`,
    );

    handleExternalApiError(response);

    const places: PlacesResponse = await response.json();

    return places.features.map((place) => ({
      name: place.properties.name,
      address: place.properties.formatted,
      lat: place.properties.lat,
      lon: place.properties.lon,
      description: place.properties.description,
      artworkType: place.properties.artwork_type,
    }));
  }
}
