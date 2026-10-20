import { Module } from '@nestjs/common';
import { UnsplashService } from './unsplash.service.js';
import { UnsplashController } from './unsplash.controller.js';

@Module({
  providers: [UnsplashService],
  controllers: [UnsplashController]
})
export class UnsplashModule {}
