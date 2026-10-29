import { Module } from '@nestjs/common';
import { WikidataService } from './wikidata.service.js';

@Module({
  providers: [WikidataService],
  exports: [WikidataService],
})
export class WikidataModule {}
