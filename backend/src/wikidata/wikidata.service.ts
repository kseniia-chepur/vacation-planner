import { Injectable } from '@nestjs/common';
import { WikidataResponse, PlaceDetails } from './interfaces/index.js';
import { handleExternalApiError } from '../common/utils/handle-external-api-error.js';

@Injectable()
export class WikidataService {
  async getPlaceDetails(wikidataId: string): Promise<PlaceDetails | null> {
    const response = await fetch(
      `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${wikidataId}&props=labels%7Cdescriptions%7Cclaims&languages=en&format=json`,
    );

    handleExternalApiError(response);

    const data: WikidataResponse = await response.json();
    const entity = data.entities[wikidataId];

    if (!entity) return null;

    let image = entity.claims?.P18?.[0]?.mainsnak.datavalue?.value;

    if (image) {
      image = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
        image,
      )}`;
    }

    return {
      name: entity.labels?.en?.value,
      description: entity.descriptions?.en?.value,
      image,
    };
  }
}
