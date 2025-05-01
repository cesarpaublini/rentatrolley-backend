import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({
    description: 'The name of the city',
    example: 'New York',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The state ID of the city',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  state_id: number;
}
