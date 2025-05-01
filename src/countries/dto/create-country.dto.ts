import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({
    description: 'The name of the country',
    example: 'United States',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The ISO code of the country', example: 'US' })
  @IsNotEmpty()
  @IsString()
  iso_code: string;

  @ApiProperty({
    description: 'The currency ISO code of the country',
    example: 'USD',
  })
  @IsNotEmpty()
  @IsString()
  currency_iso: string;
}
