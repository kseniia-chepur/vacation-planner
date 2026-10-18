import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from './schemas/trip.schema.js';
import { UpdateTripDto } from './dto/update-trip.dto.js';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private readonly tripModel: Model<Trip>,
  ) {}

  create(createTripDto: CreateTripDto) {
    return this.tripModel.create(createTripDto);
  }

  findAll() {
    return this.tripModel.find().exec();
  }

  findOne(id: string) {
    return this.tripModel.findById(id).exec();
  }

  update(id: string, updateTripDto: UpdateTripDto) {
    return this.tripModel
      .findByIdAndUpdate(id, updateTripDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  remove(id: string) {
    return this.tripModel.findByIdAndDelete(id).exec();
  }
}
