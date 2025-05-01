import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventTypeDto {
  @ApiProperty({
    description: 'The name of the event type',
    example: 'Trolley Ride',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
