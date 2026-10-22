import { Test, TestingModule } from '@nestjs/testing';
import { GeoapifyController } from './geoapify.controller.js';

describe('GeoapifyController', () => {
  let controller: GeoapifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoapifyController],
    }).compile();

    controller = module.get<GeoapifyController>(GeoapifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
