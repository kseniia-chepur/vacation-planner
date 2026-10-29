import { Module } from '@nestjs/common';
import { GeoapifyService } from './geoapify.service.js';
import { GeoapifyController } from './geoapify.controller.js';
import { OverpassModule } from '../overpass/overpass.module.js';
import { WikidataModule } from '../wikidata/wikidata.module.js';

@Module({
  imports: [OverpassModule, WikidataModule],
  providers: [GeoapifyService],
  controllers: [GeoapifyController],
})
export class GeoapifyModule {}
