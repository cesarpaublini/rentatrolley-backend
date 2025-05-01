/* eslint-disable @typescript-eslint/no-unsafe-call */

// eslint-disable-next-line prettier/prettier
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLeadDto {
  @ApiProperty({ description: 'The first name of the lead', example: 'John' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'The last name of the lead', example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'The email of the lead',
    example: 'john.doe@example.com',
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

  @ApiProperty({ description: 'The city ID of the lead', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @ApiProperty({ description: 'The event type ID of the lead', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  event_type_id: number;

  @ApiProperty({
    description: 'The event date of the lead',
    example: '2023-12-25T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  event_date: Date;

  @ApiProperty({ description: 'The pickup city ID of the lead', example: 3 })
  @IsNotEmpty()
  @IsNumber()
  pickup_city_id: number;

  @ApiProperty({ description: 'The drop city ID of the lead', example: 4 })
  @IsNotEmpty()
  @IsNumber()
  drop_city_id: number;

  @ApiProperty({
    description: 'The pickup date and time of the lead',
    example: '2023-12-25T10:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  pickup_date_time: Date;

  @ApiProperty({ description: 'The duration of the trip in hours', example: 5 })
  @IsNotEmpty()
  @IsNumber()
  duration_hours: number;

  @ApiProperty({ description: 'The type of trolley', example: 'Standard' })
  @IsNotEmpty()
  @IsString()
  trolley_type: string;

  @ApiProperty({
    description: 'Whether the trip is a return trip',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  return_trip: boolean;

  @ApiProperty({ description: 'The number of passengers', example: 4 })
  @IsNotEmpty()
  @IsNumber()
  passenger_count: number;

  @ApiProperty({
    description: 'Any special requirements for the trip',
    example: 'None',
  })
  @IsNotEmpty()
  @IsString()
  special_requirements: string;
}
