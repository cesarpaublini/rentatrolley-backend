import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCountryDto } from './create-country.dto';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
  @ApiProperty({
    description: 'The name of the country',
    example: 'United States',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'The ISO code of the country',
    example: 'US',
    required: false,
  })
  iso_code?: string;

  @ApiProperty({
    description: 'The currency ISO code of the country',
    example: 'USD',
    required: false,
  })
  currency_iso?: string;
}
