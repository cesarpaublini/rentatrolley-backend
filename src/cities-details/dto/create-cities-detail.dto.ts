import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { IsJSON } from 'class-validator';

export class CreateCitiesDetailDto {
  @ApiProperty({
    description: 'The ID of the city',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @ApiProperty({
    description: 'The details of the city',
    example: {
      name: 'New York',
    },
  })
  @IsNotEmpty()
  @IsJSON()
  details: JSON;
}
