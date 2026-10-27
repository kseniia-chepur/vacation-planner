import { Module } from '@nestjs/common';
import { OverpassService } from './overpass.service.js';

@Module({
  providers: [OverpassService],
  controllers: [],
  exports: [OverpassService],
})
export class OverpassModule {}
