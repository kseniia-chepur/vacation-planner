import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto.js';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
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

  async findOne(id: string) {
    this.validateId(id);

    const trip = await this.tripModel.findById(id).exec();

    this.throwIfNotFound(trip, id);

    return trip;
  }

  async update(id: string, updateTripDto: UpdateTripDto) {
    this.validateId(id);

    const trip = await this.tripModel
      .findByIdAndUpdate(id, updateTripDto, {
        returnDocument: 'after',
        runValidators: true,
      })
      .exec();

    this.throwIfNotFound(trip, id);

    return trip;
  }

  async remove(id: string) {
    this.validateId(id);

    const trip = await this.tripModel.findByIdAndDelete(id).exec();
    this.throwIfNotFound(trip, id);

    return trip;
  }

  private validateId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid trip ID');
    }
  }

  private throwIfNotFound(trip: Trip | null, id: string) {
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
  }
}
