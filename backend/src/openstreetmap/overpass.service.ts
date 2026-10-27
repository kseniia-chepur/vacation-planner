import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { handleExternalApiError } from '../common/utils/handle-external-api-error.js';
import { ConfigService } from '@nestjs/config';
import { ERROR_MESSAGES } from '../common/constants/error-messages.js';
import { OverpassResponse, Place } from './interfaces/index.js';

@Injectable()
export class OverpassService {
  constructor(private readonly configService: ConfigService) {}

  private getApiKey(): string {
    const apiKey = this.configService.get<string>('OVERPASS_API_KEY');

    if (!apiKey) {
      throw new InternalServerErrorException(ERROR_MESSAGES.API_KEY_MISSING);
    }

    return apiKey;
  }

  async searchPlaces(lat: number, lon: number): Promise<Place[]> {
    const apikey = this.getApiKey();

    const query = `
    [out:json][timeout:25];
    (
      nwr(around:5000,${lat},${lon})["tourism"="attraction"];     
    );
    out center tags;
  `;

    const response = await fetch(
      `https://api.overpass.ch/v1/${apikey}/interpreter`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams({ data: query }),
      },
    );

    handleExternalApiError(response);

    const data: OverpassResponse = await response.json();

    return data.elements
      .filter((element) => element.tags?.name)
      .map((element) => {
        const {
          name,
          description,
          'name:en': nameEn,
          'description:en': descriptionEn,
          website,
          wikipedia,
          wikidata,
          phone,
          opening_hours: openingHours,
          wheelchair,
        } = element.tags || {};

        const lat = element.lat ?? element.center?.lat;
        const lon = element.lon ?? element.center?.lon;

        return {
          name,
          description,
          nameEn,
          descriptionEn,
          lat,
          lon,
          website,
          wikipedia,
          wikidata,
          phone,
          openingHours,
          wheelchair,
        };
      });
  }
}
