import { Controller, Get, Query } from '@nestjs/common';
import { UnsplashService } from './unsplash.service.js';
import { GetRandomPhotoDto } from './dto/get-random-photo.dto.js';

@Controller('unsplash')
export class UnsplashController {
  constructor(private readonly unsplashService: UnsplashService) {}

  @Get('random')
  getRandomPhoto(@Query() query: GetRandomPhotoDto) {
    return this.unsplashService.getRandomPhoto(query.destination);
  }
}
