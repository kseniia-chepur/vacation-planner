import { Controller, Get, Query } from '@nestjs/common';
import { GeoapifyService } from './geoapify.service.js';

@Controller('geoapify')
export class GeoapifyController {
  constructor(private readonly geoapifyService: GeoapifyService) {}

  @Get('search')
  searchPlaces(@Query('destination') destination: string) {
    return this.geoapifyService.searchPlaces(destination);
  }
}
