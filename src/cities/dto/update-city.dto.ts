import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @ApiProperty({
    description: 'The name of the city',
    example: 'New York',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'The state ID of the city',
    example: 1,
    required: false,
  })
  state_id?: number;
}
