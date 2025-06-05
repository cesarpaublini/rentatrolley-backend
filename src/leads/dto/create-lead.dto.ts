import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLeadDto {
  @ApiProperty({
    description: 'The full name of the lead',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    description: 'The event type ID of the lead',
    example: 3,
  })
  @IsNumber()
  event_type_id: number;

  @ApiProperty({
    description: 'The type of vehicle',
    example: 'green_trolley',
  })
  @IsString()
  vehicle_type: string;

  @ApiProperty({
    description: 'The event city ID',
    example: 14,
  })
  @IsNumber()
  event_city_id: number;

  @ApiProperty({
    description: 'The pickup location',
    example: 'somewhere in the city',
  })
  @IsString()
  pickup_location: string;

  @ApiProperty({
    description: 'The drop location',
    example: 'another place in the city',
  })
  @IsString()
  drop_location: string;

  @ApiProperty({
    description: 'The pickup date',
    example: '2025-05-21T00:00:00.000Z',
  })
  @IsDateString()
  pickup_date: Date;

  @ApiProperty({
    description: 'The pickup time',
    example: '20:33',
  })
  @IsString()
  pickup_time: string;

  @ApiProperty({
    description: 'The duration of the trip in hours',
    example: 7,
  })
  @IsNumber()
  duration_hours: number;

  @ApiProperty({
    description: 'The number of passengers',
    example: 4,
  })
  @IsNumber()
  passenger_count: number;

  @ApiProperty({
    description: 'The email of the lead',
    example: 'example@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The phone number of the lead',
    example: '123-456-7890',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    description: 'Any special requirements for the trip',
    example: 'None',
  })
  @IsString()
  special_requirements: string;

  @ApiProperty({
    description: 'The amount of trolleys to be rented',
    example: 1,
  })
  @IsNumber()
  trolley_amount: number;
}
