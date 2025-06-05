import { Test, TestingModule } from '@nestjs/testing';
import { CitiesDetailsService } from './cities-details.service';

describe('CitiesDetailsService', () => {
  let service: CitiesDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesDetailsService],
    }).compile();

    service = module.get<CitiesDetailsService>(CitiesDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
