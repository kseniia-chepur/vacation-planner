import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TripsModule } from './trips/trips.module.js';
import { UnsplashModule } from './unsplash/unsplash.module.js';
import { GeoapifyModule } from './geoapify/geoapify.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    TripsModule,
    UnsplashModule,
    GeoapifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
