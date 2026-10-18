import { Controller, Post, Body } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto.js';
import { TripsService } from './trips.service.js';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  createTrip(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }
}
