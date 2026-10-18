import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from './schemas/trip.schema.js';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private readonly tripModel: Model<Trip>,
  ) {}

  create(createTripDto: CreateTripDto) {}
}
