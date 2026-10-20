import { Test, TestingModule } from '@nestjs/testing';
import { UnsplashService } from './unsplash.service.js';

describe('UnsplashService', () => {
  let service: UnsplashService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnsplashService],
    }).compile();

    service = module.get<UnsplashService>(UnsplashService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
