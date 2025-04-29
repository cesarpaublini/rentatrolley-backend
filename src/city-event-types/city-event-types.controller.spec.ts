import { Test, TestingModule } from '@nestjs/testing';
import { CityEventTypesController } from './city-event-types.controller';
import { CityEventTypesService } from './city-event-types.service';

describe('CityEventTypesController', () => {
  let controller: CityEventTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityEventTypesController],
      providers: [CityEventTypesService],
    }).compile();

    controller = module.get<CityEventTypesController>(CityEventTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
