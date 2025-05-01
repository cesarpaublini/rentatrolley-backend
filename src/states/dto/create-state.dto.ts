import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty({
    description: 'The name of the state',
    example: 'California',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The ISO code of the state',
    example: 'CA',
  })
  @IsNotEmpty()
  @IsString()
  abbreviation: string;

  @ApiProperty({
    description: 'The country ID to which the state belongs',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  country_id: number;
}
