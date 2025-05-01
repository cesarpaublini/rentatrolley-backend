import { PartialType } from '@nestjs/mapped-types';
import { CreateCityEventTypeDto } from './create-city-event-type.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCityEventTypeDto extends PartialType(
  CreateCityEventTypeDto,
) {
  @ApiProperty({
    description: 'The city ID of the event type',
    example: 1,
    required: false,
  })
  city_id?: number;

  @ApiProperty({
    description: 'The event type ID of the city event type',
    example: 1,
    required: false,
  })
  event_type_id?: number;
}
