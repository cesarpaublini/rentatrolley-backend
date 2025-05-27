import { Test, TestingModule } from '@nestjs/testing';
import { CitiesDetailsController } from './cities-details.controller';
import { CitiesDetailsService } from './cities-details.service';

describe('CitiesDetailsController', () => {
  let controller: CitiesDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesDetailsController],
      providers: [CitiesDetailsService],
    }).compile();

    controller = module.get<CitiesDetailsController>(CitiesDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
