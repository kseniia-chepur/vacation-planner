import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller.js';
import { TripsService } from './trips.service.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './schemas/trip.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
