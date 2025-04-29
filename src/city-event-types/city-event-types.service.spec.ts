import { Test, TestingModule } from '@nestjs/testing';
import { CityEventTypesService } from './city-event-types.service';

describe('CityEventTypesService', () => {
  let service: CityEventTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CityEventTypesService],
    }).compile();

    service = module.get<CityEventTypesService>(CityEventTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
