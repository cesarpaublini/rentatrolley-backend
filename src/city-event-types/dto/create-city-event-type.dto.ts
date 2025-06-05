import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityEventTypeDto {
  @ApiProperty({
    description: 'The city ID of the event type',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @ApiProperty({
    description: 'The event type ID of the city event type',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  event_type_id: number;
}
