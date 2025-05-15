import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventTypeDto {
  @ApiProperty({
    description: 'The name of the event type',
    example: 'Trolley Ride',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The price of the event type',
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The description of the event type',
    example: 'This is a test description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
