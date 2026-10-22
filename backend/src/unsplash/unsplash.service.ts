import {
  Injectable,
  InternalServerErrorException,
  BadGatewayException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnsplashPhotoResponse } from './interfaces/photo-response.interface.js';
import { DestinationPhoto } from './interfaces/destination-photo.interface.js';
import { ERROR_MESSAGES } from '../common/constants/error-messages.js';
import { handleExternalApiError } from '../common/utils/handle-external-api-error.js';

@Injectable()
export class UnsplashService {
  constructor(private readonly configService: ConfigService) {}

  async getRandomPhoto(destination: string): Promise<DestinationPhoto> {
    const accessKey = this.configService.get<string>('UNSPLASH_ACCESS_KEY');

    if (!accessKey) {
      throw new InternalServerErrorException(ERROR_MESSAGES.API_KEY_MISSING);
    }

    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
        destination,
      )}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      },
    );

    handleExternalApiError(response);

    const photo: UnsplashPhotoResponse = await response.json();

    return {
      id: photo.id,
      description: photo.alt_description,
      imageUrl: photo.urls.regular,
    };
  }
}
