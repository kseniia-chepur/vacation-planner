import { Module } from '@nestjs/common';
import { GeoapifyService } from './geoapify.service.js';
import { GeoapifyController } from './geoapify.controller.js';

@Module({
  providers: [GeoapifyService],
  controllers: [GeoapifyController]
})
export class GeoapifyModule {}
