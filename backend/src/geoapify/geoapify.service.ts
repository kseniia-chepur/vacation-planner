import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '../common/constants/error-messages.js';
import { GeocodingResponse } from './interfaces/index.js';
import { handleExternalApiError } from '../common/utils/handle-external-api-error.js';
import { OverpassService } from '../overpass/overpass.service.js';
import { WikidataService } from '../wikidata/wikidata.service.js';

@Injectable()
export class GeoapifyService {
  private readonly baseUrl = 'https://api.geoapify.com';

  constructor(
    private readonly configService: ConfigService,
    private readonly overpassService: OverpassService,
    private readonly wikidataService: WikidataService,
  ) {}

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

    const places = await this.overpassService.searchPlaces(
      data.results[0].lat,
      data.results[0].lon,
    );

    return Promise.all(
      places.map(async (place) => {
        if (!place.wikidata) {
          return place;
        }

        try {
          const details = await this.wikidataService.getPlaceDetails(
            place.wikidata,
          );

          const { name: nameEn, description: descriptionEn, image } =
            details || {};

          return {
            ...place,
            nameEn,
            descriptionEn,
            image,
          };
        } catch {
          return place;
        }
      }),
    );
  }
}
