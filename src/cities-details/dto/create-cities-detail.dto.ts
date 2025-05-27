import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
    description: 'The slug of the city',
    example: 'new-york',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'The details of the city in a valid stringified JSON format',
    example: {
      name: 'New York',
    },
  })
  @IsNotEmpty()
  @IsJSON()
  details: JSON;
}
