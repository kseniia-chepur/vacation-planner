export interface WikidataResponse {
  entities: {
    [id: string]: {
      labels?: { en?: { value: string } };
      descriptions?: { en?: { value: string } };
      claims?: {
        P18?: { mainsnak: { datavalue?: { value: string } } }[];
      };
    };
  };
}
