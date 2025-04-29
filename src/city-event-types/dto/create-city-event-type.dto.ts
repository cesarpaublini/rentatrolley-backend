import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCityEventTypeDto {
  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @IsNotEmpty()
  @IsNumber()
  event_type_id: number;
}
