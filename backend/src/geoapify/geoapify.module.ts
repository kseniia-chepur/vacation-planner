import { Module } from '@nestjs/common';
import { GeoapifyService } from './geoapify.service.js';
import { GeoapifyController } from './geoapify.controller.js';
import { OverpassModule } from '../openstreetmap/overpass.module.js';

@Module({
  imports: [OverpassModule],
  providers: [GeoapifyService],
  controllers: [GeoapifyController],
})
export class GeoapifyModule {}
